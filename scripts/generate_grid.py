#!/usr/bin/env python3
"""
Generate gridAssignments.ts from GPT vision analysis results.

Reads:
  - cell-analysis/analysis_results.json  (GPT analysis of 100 grid cells)
  - src/data/abbreviationDecodings.ts     (abbreviation -> speciesId mapping)
  - src/data/gridAssignments.ts           (existing structures per cell)

Outputs:
  - src/data/gridAssignments.ts           (complete regenerated file)
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Optional

# -------------------------------------------------------------------
# Paths
# -------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parent.parent
ANALYSIS_JSON = PROJECT_ROOT / "cell-analysis" / "analysis_results.json"
ABBREV_TS = PROJECT_ROOT / "src" / "data" / "abbreviationDecodings.ts"
GRID_TS = PROJECT_ROOT / "src" / "data" / "gridAssignments.ts"
OUTPUT_TS = GRID_TS  # overwrite in place

# -------------------------------------------------------------------
# Grid layout helpers
# -------------------------------------------------------------------
ROW_LETTERS = "ABCDEFGHIJ"

def cell_id_to_row_col(cell_id: str) -> tuple[int, int]:
    """Convert e.g. 'A5' -> (0, 4), 'J10' -> (9, 9)."""
    letter = cell_id[0]
    col_num = int(cell_id[1:])
    return ROW_LETTERS.index(letter), col_num - 1


def all_cell_ids() -> list[str]:
    """Return all 100 cell ids in row-major order: A1..A10, B1..B10, ... J10."""
    ids = []
    for letter in ROW_LETTERS:
        for col in range(1, 11):
            ids.append(f"{letter}{col}")
    return ids

# -------------------------------------------------------------------
# Parse abbreviationDecodings.ts
# -------------------------------------------------------------------
def parse_abbreviation_decodings(ts_path: Path) -> dict[str, dict]:
    """
    Parse the TS file and return a dict keyed by lowercase abbreviation.
    Value: { 'abbreviation': original, 'speciesId': str, 'confidence': str }
    """
    text = ts_path.read_text()
    # Match lines like:  { abbreviation: 'ECH.PA', speciesId: 'echinacea-pallida', confidence: 'high' ... },
    pattern = re.compile(
        r"\{\s*abbreviation:\s*'([^']+)'\s*,\s*speciesId:\s*'([^']+)'\s*,\s*confidence:\s*'([^']+)'"
    )
    decodings = {}
    for m in pattern.finditer(text):
        abbr, species_id, confidence = m.group(1), m.group(2), m.group(3)
        key = abbr.lower()
        # First entry wins (higher confidence entries come first in the file)
        if key not in decodings:
            decodings[key] = {
                "abbreviation": abbr,
                "speciesId": species_id,
                "confidence": confidence,
            }
    return decodings

# -------------------------------------------------------------------
# Parse existing gridAssignments.ts to extract structures
# -------------------------------------------------------------------
def parse_existing_structures(ts_path: Path) -> dict[str, list[str]]:
    """
    Parse gridAssignments.ts and return {cellId: [structures...]}.
    Only extracts the structures arrays.
    """
    text = ts_path.read_text()
    structures_map: dict[str, list[str]] = {}

    # Find each cell block by id and its structures
    cell_pattern = re.compile(
        r"id:\s*'([A-J]\d+)'.*?structures:\s*\[([^\]]*)\]",
        re.DOTALL,
    )
    structure_item = re.compile(r"'([^']+)'")

    for m in cell_pattern.finditer(text):
        cell_id = m.group(1)
        structs_text = m.group(2)
        structs = structure_item.findall(structs_text)
        structures_map[cell_id] = structs

    return structures_map

# -------------------------------------------------------------------
# Fuzzy matching for OCR labels
# -------------------------------------------------------------------
def normalize_for_matching(s: str) -> str:
    """Normalize a string for fuzzy matching: lowercase, remove dots,
    hyphens, extra spaces, and apply common OCR swaps."""
    s = s.lower().strip()
    # Remove dots and hyphens
    s = s.replace(".", "").replace("-", "")
    # Collapse whitespace
    s = re.sub(r"\s+", " ", s)
    return s


def apply_ocr_swaps(s: str) -> list[str]:
    """Generate variants with common OCR character swaps.
    Returns a list of unique normalized variants (always includes original)."""
    variants = {s}

    # l <-> I <-> i (lowercase L vs uppercase I vs lowercase i)
    if "l" in s:
        variants.add(s.replace("l", "i"))
    if "i" in s:
        variants.add(s.replace("i", "l"))

    # 0 <-> O/o
    if "0" in s:
        variants.add(s.replace("0", "o"))
    if "o" in s:
        variants.add(s.replace("o", "0"))

    # rn <-> m
    if "rn" in s:
        variants.add(s.replace("rn", "m"))
    if "m" in s:
        variants.add(s.replace("m", "rn"))

    # Double-s at start (e.g., "ssalvia" -> "salvia")
    if s.startswith("ss"):
        variants.add(s[1:])

    # "nr" at start is common OCR for "n" (e.g., "nrpeta" -> "nepeta")
    # This is handled by general matching already

    return list(variants)


# -------------------------------------------------------------------
# Supplementary known-label mappings
# -------------------------------------------------------------------
# Labels that commonly appear in the garden map but aren't in
# abbreviationDecodings.ts. Derived from the existing gridAssignments.ts
# which was manually curated.
KNOWN_LABELS: dict[str, dict] = {
    "baltic parsley":       {"speciesId": "baltic-parsley", "confidence": "high"},
    "baltlc parsley":       {"speciesId": "baltic-parsley", "confidence": "high"},
    "ball parsley":         {"speciesId": "baltic-parsley", "confidence": "medium"},
    "ceph gig":             {"speciesId": "cephalaria-gigantea", "confidence": "high"},
    "monarda b":            {"speciesId": "monarda-bradburiana", "confidence": "high"},
    "monarda brad":         {"speciesId": "monarda-bradburiana", "confidence": "high"},
    "monarda":              {"speciesId": "monarda", "confidence": "high"},
    "russian sage":         {"speciesId": "russian-sage", "confidence": "high"},
    "sea holly":            {"speciesId": "sea-holly", "confidence": "high"},
    "golden rod":           {"speciesId": "golden-rod", "confidence": "high"},
    "red twig dogwood":     {"speciesId": "red-twig-dogwood", "confidence": "high"},
    "red twig":             {"speciesId": "red-twig-dogwood", "confidence": "medium"},
    "swamp milkweed":       {"speciesId": "swamp-milkweed", "confidence": "high"},
    "swamp mllkweed":       {"speciesId": "swamp-milkweed", "confidence": "high"},
    "milkweed":             {"speciesId": "swamp-milkweed", "confidence": "medium"},
    "butterfly weed":       {"speciesId": "butterfly-weed", "confidence": "high"},
    "cinnamon fern":        {"speciesId": "cinnamon-fern", "confidence": "high"},
    "fern":                 {"speciesId": "cinnamon-fern", "confidence": "low"},
    "daylily":              {"speciesId": "daylily", "confidence": "high"},
    "hosta halcyon":        {"speciesId": "hosta-halcyon", "confidence": "high"},
    "lavender":             {"speciesId": "lavender", "confidence": "high"},
    "thyme":                {"speciesId": "thyme", "confidence": "high"},
    "oregano":              {"speciesId": "oregano", "confidence": "high"},
    "fennel":               {"speciesId": "fennel", "confidence": "high"},
    "nepeta":               {"speciesId": "nepeta", "confidence": "high"},
    "nrpeta":               {"speciesId": "nepeta", "confidence": "medium"},
    "sage":                 {"speciesId": "sage", "confidence": "high"},
    "salvia":               {"speciesId": "salvia", "confidence": "high"},
    "phlox":                {"speciesId": "phlox", "confidence": "high"},
    "amaranth":             {"speciesId": "amaranth", "confidence": "high"},
    "sneeze weed":          {"speciesId": "sneeze-weed", "confidence": "high"},
    "verbena hastata":      {"speciesId": "verbena-hastata", "confidence": "high"},
    "persicaria polymorpha": {"speciesId": "persicaria-polymorpha", "confidence": "high"},
    "meadow rue":           {"speciesId": "meadow-rue", "confidence": "high"},
    "wood spurge":          {"speciesId": "wood-spurge", "confidence": "high"},
    "aruncus horatia":      {"speciesId": "aruncus-horatia", "confidence": "high"},
    "aruncus horatio":      {"speciesId": "aruncus-horatia", "confidence": "high"},
    "cherry":               {"speciesId": "cherry", "confidence": "high"},
    "cherry laurel":        {"speciesId": "cherry-laurel", "confidence": "high"},
    "camellia":             {"speciesId": "camellia", "confidence": "high"},
    "camellia snowman":     {"speciesId": "camellia", "confidence": "high"},
    "yew":                  {"speciesId": "yew", "confidence": "high"},
    "beans":                {"speciesId": "beans", "confidence": "high"},
    "PLANTER":              {"speciesId": "planter", "confidence": "high"},
    "rudbeckia sub":        {"speciesId": "rudbeckia", "confidence": "high"},
    "rudbekia sub":         {"speciesId": "rudbeckia", "confidence": "high"},
    "rudbeckia laciniata":  {"speciesId": "rudbeckia-laciniata", "confidence": "high"},
    "rudbekia laciniata":   {"speciesId": "rudbeckia-laciniata", "confidence": "high"},
    "yellow hyssop":        {"speciesId": "hyssop", "confidence": "high"},
    "viburnum dawn":        {"speciesId": "viburnum", "confidence": "high"},
    "menzies burnet":       {"speciesId": "menzies-burnet", "confidence": "medium"},
    "actea chocoholic":     {"speciesId": "actaea-chocoholic", "confidence": "high"},
    "sprinter bx":          {"speciesId": "sprinter-bx", "confidence": "high"},
    "bx":                   {"speciesId": "sprinter-bx", "confidence": "low"},
    "knautia macedo":       {"speciesId": "knautia-macedo", "confidence": "high"},
    "knautia maced":        {"speciesId": "knautia-macedo", "confidence": "high"},
    "knautla macedon":      {"speciesId": "knautia-macedo", "confidence": "high"},
    "little blue stem":     {"speciesId": "little-bluestem", "confidence": "medium"},
    "little blue-stem":     {"speciesId": "little-bluestem", "confidence": "medium"},
    "coreopsis mix":        {"speciesId": "coreopsis", "confidence": "high"},
    "salvia c":             {"speciesId": "salvia", "confidence": "low"},
    "sa sunglas":           {"speciesId": "salvia", "confidence": "low"},
    "echpu":                {"speciesId": "echinacea-purpurea", "confidence": "high"},
    "echgj":                {"speciesId": "echinacea-green-jewel", "confidence": "medium"},
    "echg?":                {"speciesId": "echinacea-green-jewel", "confidence": "low"},
    "ech pallida":          {"speciesId": "echinacea-pallida", "confidence": "high"},
    "phr":                  {"speciesId": "pennisetum", "confidence": "low"},
    "sprob hetero":         {"speciesId": "sporobolus-heterolepis", "confidence": "medium"},
    "veron fasc":           {"speciesId": "veronica-fascination", "confidence": "medium"},
    "verbasc olympic":      {"speciesId": "verbascum-olympicum", "confidence": "high"},
    "verbas-cum nlgrum alba": {"speciesId": "verbascum-nigrum", "confidence": "medium"},
    "*rattle snake":        {"speciesId": "rattlesnake-master", "confidence": "high"},
    "*rattle-snake":        {"speciesId": "rattlesnake-master", "confidence": "high"},
    "rattle snake":         {"speciesId": "rattlesnake-master", "confidence": "high"},
    "rattle-snake":         {"speciesId": "rattlesnake-master", "confidence": "high"},
    "san-gulsorba squrrel": {"speciesId": "san-guisorba-squirrel", "confidence": "medium"},
    "ssalvia nem":          {"speciesId": "salvia-nemorosa", "confidence": "high"},
    "agastache blue fortune": {"speciesId": "eupatorium-blue-fortune", "confidence": "medium"},
    "panicu-lum cloud nine": {"speciesId": "panicum-cloud-nine", "confidence": "high"},
    "paniculum cloud nine": {"speciesId": "panicum-cloud-nine", "confidence": "high"},
    "panIculum cloud nlne": {"speciesId": "panicum-cloud-nine", "confidence": "high"},
    "phlx. pan. jeana":     {"speciesId": "phlox-paniculata-jeana", "confidence": "medium"},
    "phlx. rand":           {"speciesId": "phlox-paniculata-david", "confidence": "low"},
    "sa gras":              {"speciesId": "sa-grass", "confidence": "medium"},
    "sa grass":             {"speciesId": "sa-grass", "confidence": "medium"},
    "knipho-fia uvalia":    {"speciesId": "kniphofia-uvaria", "confidence": "medium"},
    "viburnum x bodnantense 'dawn'": {"speciesId": "viburnum", "confidence": "high"},
    "viburnum x bodnantense dawn": {"speciesId": "viburnum", "confidence": "high"},
}

# Build a lowercase lookup for KNOWN_LABELS
_KNOWN_LABELS_LOWER = {k.lower(): v for k, v in KNOWN_LABELS.items()}


def to_kebab_case(s: str) -> str:
    """Convert label to kebab-case for use as speciesId."""
    s = s.lower().strip()
    s = s.lstrip("*")
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s.strip())
    s = re.sub(r"-+", "-", s)
    return s


def match_label(label: str, decodings: dict[str, dict]) -> Optional[dict]:
    """
    Try to match a GPT label against:
      1. abbreviationDecodings (from TS file)
      2. KNOWN_LABELS (supplementary known names)
    Returns the decoding dict if matched, else None.
    """
    label_stripped = label.strip()

    # 1. Exact case-insensitive match against abbreviation decodings
    key = label_stripped.lower()
    if key in decodings:
        return decodings[key]

    # 2. Exact case-insensitive match against known labels
    if key in _KNOWN_LABELS_LOWER:
        return _KNOWN_LABELS_LOWER[key]

    # 3. Normalized match (remove dots, hyphens, collapse spaces)
    norm_label = normalize_for_matching(label_stripped)

    for abbr_key, decoding in decodings.items():
        norm_abbr = normalize_for_matching(abbr_key)
        if norm_label == norm_abbr:
            return decoding

    for known_key, known_val in _KNOWN_LABELS_LOWER.items():
        norm_known = normalize_for_matching(known_key)
        if norm_label == norm_known:
            return known_val

    # 4. OCR variant matching
    for variant in apply_ocr_swaps(norm_label):
        for abbr_key, decoding in decodings.items():
            norm_abbr = normalize_for_matching(abbr_key)
            if variant == norm_abbr:
                return decoding
        for known_key, known_val in _KNOWN_LABELS_LOWER.items():
            norm_known = normalize_for_matching(known_key)
            if variant == norm_known:
                return known_val

    # 5. Try with leading asterisk removed/added
    if label_stripped.startswith("*"):
        without_star = label_stripped[1:].strip()
        result = match_label(without_star, decodings)
        if result:
            return result
    else:
        with_star = "*" + label_stripped
        result_star = decodings.get(with_star.lower())
        if result_star:
            return result_star
        if with_star.lower() in _KNOWN_LABELS_LOWER:
            return _KNOWN_LABELS_LOWER[with_star.lower()]

    # 6. No-space normalized comparison
    norm_no_space = norm_label.replace(" ", "")
    for abbr_key, decoding in decodings.items():
        norm_abbr_no_space = normalize_for_matching(abbr_key).replace(" ", "")
        if norm_no_space == norm_abbr_no_space:
            return decoding
    for known_key, known_val in _KNOWN_LABELS_LOWER.items():
        norm_known_ns = normalize_for_matching(known_key).replace(" ", "")
        if norm_no_space == norm_known_ns:
            return known_val

    # 7. OCR variants on the no-space version
    for variant in apply_ocr_swaps(norm_no_space):
        for abbr_key, decoding in decodings.items():
            norm_abbr_no_space = normalize_for_matching(abbr_key).replace(" ", "")
            if variant == norm_abbr_no_space:
                return decoding
        for known_key, known_val in _KNOWN_LABELS_LOWER.items():
            norm_known_ns = normalize_for_matching(known_key).replace(" ", "")
            if variant == norm_known_ns:
                return known_val

    # 8. Check if the label contains a known key as a substring
    # e.g. "Viburnum x bodnantense 'Dawn'" contains "dawn" matching "viburnum dawn"
    for known_key, known_val in _KNOWN_LABELS_LOWER.items():
        if len(known_key) >= 5 and known_key in key:
            return known_val

    return None

# -------------------------------------------------------------------
# Main processing
# -------------------------------------------------------------------
def main():
    # Load inputs
    with open(ANALYSIS_JSON) as f:
        analysis = json.load(f)

    decodings = parse_abbreviation_decodings(ABBREV_TS)
    existing_structures = parse_existing_structures(GRID_TS)

    # Track stats
    total_plantings = 0
    total_circles = 0
    matched_count = 0
    unmatched_labels: dict[str, list[str]] = {}  # label -> [cellIds]
    cell_circle_counts: dict[str, int] = {}

    # Build cells
    cells: list[dict] = []
    for cell_id in all_cell_ids():
        row, col = cell_id_to_row_col(cell_id)
        structures = existing_structures.get(cell_id, [])

        gpt_data = analysis.get(cell_id, {})
        gpt_plantings = gpt_data.get("plantings", [])
        gpt_total = gpt_data.get("totalCircles", 0)
        cell_circle_counts[cell_id] = gpt_total
        total_circles += gpt_total

        plantings = []
        planting_idx = 1
        for p in gpt_plantings:
            label = p.get("label", "").strip()
            count = p.get("count", 0)
            if count == 0:
                continue

            total_plantings += count

            # Handle unlabeled
            if "unlabeled" in label.lower():
                plantings.append({
                    "id": f"{cell_id}-{planting_idx}",
                    "abbreviation": "unlabeled",
                    "decodedSpeciesId": "unknown",
                    "confidence": "low",
                    "quantity": count,
                })
                planting_idx += 1
                continue

            # Try to match
            decoding = match_label(label, decodings)
            if decoding:
                matched_count += count
                plantings.append({
                    "id": f"{cell_id}-{planting_idx}",
                    "abbreviation": label,
                    "decodedSpeciesId": decoding["speciesId"],
                    "confidence": decoding["confidence"],
                    "quantity": count,
                })
            else:
                # Unmatched: use kebab-cased label
                species_id = to_kebab_case(label)
                if label not in unmatched_labels:
                    unmatched_labels[label] = []
                unmatched_labels[label].append(cell_id)
                plantings.append({
                    "id": f"{cell_id}-{planting_idx}",
                    "abbreviation": label,
                    "decodedSpeciesId": species_id,
                    "confidence": "low",
                    "quantity": count,
                })
            planting_idx += 1

        cells.append({
            "row": row,
            "col": col,
            "id": cell_id,
            "plantings": plantings,
            "structures": structures,
        })

    # -------------------------------------------------------------------
    # Generate TypeScript output
    # -------------------------------------------------------------------
    lines = []
    lines.append("import type { GridCell } from '../types';")
    lines.append("")
    lines.append("// Grid: 10 rows (A-J, top to bottom) x 10 cols (1-10, left to right)")
    lines.append("// Auto-generated by scripts/generate_grid.py from GPT vision analysis")
    lines.append("")
    lines.append("export const gridAssignments: GridCell[] = [")

    current_row = -1
    for cell in cells:
        row = cell["row"]
        if row != current_row:
            letter = ROW_LETTERS[row]
            if current_row >= 0:
                lines.append("")
            lines.append(f"  // === ROW {letter} ===")
            current_row = row

        plantings_strs = []
        for p in cell["plantings"]:
            abbr_escaped = p["abbreviation"].replace("'", "\\'")
            plantings_strs.append(
                f"      {{ id: '{p['id']}', abbreviation: '{abbr_escaped}', "
                f"decodedSpeciesId: '{p['decodedSpeciesId']}', "
                f"confidence: '{p['confidence']}', quantity: {p['quantity']} }}"
            )

        structs_str = ", ".join(f"'{s}'" for s in cell["structures"])

        lines.append("  {")
        lines.append(f"    row: {cell['row']}, col: {cell['col']}, id: '{cell['id']}',")

        if plantings_strs:
            lines.append("    plantings: [")
            for i, ps in enumerate(plantings_strs):
                comma = "," if i < len(plantings_strs) - 1 else ","
                lines.append(f"{ps}{comma}")
            lines.append("    ],")
        else:
            lines.append("    plantings: [],")

        lines.append(f"    structures: [{structs_str}],")
        lines.append("  },")

    lines.append("];")
    lines.append("")
    lines.append("export const gridCellMap = new Map(gridAssignments.map(c => [c.id, c]));")
    lines.append("")

    ts_output = "\n".join(lines)

    # Write output
    with open(OUTPUT_TS, "w") as f:
        f.write(ts_output)

    print(f"Written to: {OUTPUT_TS}")
    print()

    # -------------------------------------------------------------------
    # Report
    # -------------------------------------------------------------------
    print("=" * 60)
    print("GENERATION REPORT")
    print("=" * 60)
    print()

    # Per-cell circle counts
    print("--- Total Circles Per Cell ---")
    for letter in ROW_LETTERS:
        row_cells = []
        for col in range(1, 11):
            cid = f"{letter}{col}"
            cnt = cell_circle_counts.get(cid, 0)
            row_cells.append(f"{cid}:{cnt:2d}")
        print("  " + "  ".join(row_cells))
    print()

    # Unmatched labels
    if unmatched_labels:
        print("--- Unmatched Labels (no abbreviation decoding found) ---")
        for label, cell_ids in sorted(unmatched_labels.items()):
            print(f"  '{label}' -> used in: {', '.join(cell_ids)}")
        print()
    else:
        print("--- All labels matched! ---")
        print()

    # Summary stats
    unlabeled_count = sum(
        p.get("count", 0)
        for cell_data in analysis.values()
        for p in cell_data.get("plantings", [])
        if "unlabeled" in p.get("label", "").lower()
    )

    print("--- Summary ---")
    print(f"  Total cells:            100")
    print(f"  Total circles (GPT):    {total_circles}")
    print(f"  Total planting entries:  {total_plantings}")
    print(f"  Matched (decoded):      {matched_count}")
    print(f"  Unlabeled entries:      {unlabeled_count}")
    unmatched_count = total_plantings - matched_count - unlabeled_count
    print(f"  Unmatched labels:       {unmatched_count}")
    print(f"  Unique unmatched:       {len(unmatched_labels)}")
    print()


if __name__ == "__main__":
    main()
