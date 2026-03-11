#!/usr/bin/env python3
"""Crop each grid cell from the garden map and send to GPT for circle/label analysis."""

import os
import sys
import json
import base64
import time
from pathlib import Path
from io import BytesIO
from PIL import Image
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed

# Config
API_KEY = os.environ.get("OPENAI_API_KEY", "")
IMAGE_PATH = "/Users/laurenceholt/Documents/Claude code projects/rye-kg/updated garden new 8.png"
OUTPUT_DIR = "/Users/laurenceholt/Documents/Claude code projects/rye-kg/cell-analysis"
RESULTS_FILE = os.path.join(OUTPUT_DIR, "analysis_results.json")
MODEL = "gpt-5.4"

# Grid dimensions (source image is 4320x3165)
IMG_WIDTH = 4320
IMG_HEIGHT = 3165
GRID_ROWS = 10
GRID_COLS = 10
CELL_W = IMG_WIDTH / GRID_COLS   # 432
CELL_H = IMG_HEIGHT / GRID_ROWS  # 316.5
PADDING = 40  # Extra pixels around each cell for label context

MAX_WORKERS = 5


def cell_id(row, col):
    return f"{chr(65 + row)}{col + 1}"


def crop_cell(img, row, col):
    x1 = int(col * CELL_W) - PADDING
    y1 = int(row * CELL_H) - PADDING
    x2 = int((col + 1) * CELL_W) + PADDING
    y2 = int((row + 1) * CELL_H) + PADDING
    # Clamp to image bounds
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(IMG_WIDTH, x2), min(IMG_HEIGHT, y2)
    return img.crop((x1, y1, x2, y2))


def encode_image(pil_img):
    rgb = pil_img.convert("RGB") if pil_img.mode == "RGBA" else pil_img
    buf = BytesIO()
    rgb.save(buf, format="JPEG", quality=92)
    return base64.b64encode(buf.getvalue()).decode()


PROMPT_TEMPLATE = """You are analyzing cell {cid} (row {row_letter}, column {col_num}) of a hand-drawn garden planting map divided into a 10×10 grid.

This cropped image shows the cell plus ~40 px of neighboring cells for context. The actual cell boundary is approximately 40 px inset from each edge.

Your task:
1. Count every CIRCLE (planting marker) whose CENTER falls within this cell's boundaries.
2. For each circle, identify any text label associated with it (inside, next to, or connected by a line).
3. Note any non-plant structures (paths, planters, hot tub, bench, stairs, barbecue, pond, property lines).

Circles represent individual plants. They vary in size and color (purple/violet, green, brown/tan, white-outlined, dark filled). Some circles overlap. Text labels are abbreviations or short plant names.

Rules:
- Only count circles whose CENTER is within this cell — not circles that merely touch the boundary.
- If a label refers to multiple nearby circles of the same type, list each circle individually but they share the label.
- Legend text, notes, or descriptive paragraphs are NOT circles — skip them.
- If you see no circles, say so.

Return ONLY valid JSON (no markdown fences):
{{
  "cellId": "{cid}",
  "totalCircles": <number>,
  "structures": [],
  "plantings": [
    {{
      "label": "<text label or 'unlabeled'>",
      "count": <number of circles with this label>,
      "description": "<color/size/appearance notes>"
    }}
  ],
  "notes": "<any observations about this cell>"
}}"""


def analyze_cell(client, cell_img_b64, row, col):
    cid = cell_id(row, col)
    prompt = PROMPT_TEMPLATE.format(
        cid=cid,
        row_letter=chr(65 + row),
        col_num=col + 1,
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{cell_img_b64}",
                            "detail": "high",
                        },
                    },
                ],
            }
        ],
        max_completion_tokens=4000,
    )

    raw = response.choices[0].message.content.strip()
    # Strip markdown fences if present
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1]
        if raw.endswith("```"):
            raw = raw[: raw.rfind("```")]
        raw = raw.strip()

    return json.loads(raw)


def process_cell(client, img, row, col, existing_results):
    cid = cell_id(row, col)
    if cid in existing_results and "error" not in existing_results[cid]:
        return cid, existing_results[cid], True  # already done

    cell_img = crop_cell(img, row, col)
    cell_img_b64 = encode_image(cell_img)

    # Save crop for debugging
    rgb = cell_img.convert("RGB") if cell_img.mode == "RGBA" else cell_img
    rgb.save(os.path.join(OUTPUT_DIR, f"{cid}.jpg"), quality=92)

    try:
        result = analyze_cell(client, cell_img_b64, row, col)
        return cid, result, False
    except Exception as e:
        return cid, {"error": str(e)}, False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Load existing partial results if any
    existing = {}
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE) as f:
            existing = json.load(f)
        print(f"Loaded {len(existing)} existing results")

    print("Loading image...")
    img = Image.open(IMAGE_PATH).convert("RGB")
    img.load()  # Force into memory (thread-safe)
    print(f"Image size: {img.size}")

    client = OpenAI(api_key=API_KEY)
    results = dict(existing)

    # Build task list
    tasks = []
    for row in range(GRID_ROWS):
        for col in range(GRID_COLS):
            tasks.append((row, col))

    skipped = 0
    done = 0
    errors = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(process_cell, client, img, r, c, existing): (r, c)
            for r, c in tasks
        }

        for future in as_completed(futures):
            row, col = futures[future]
            cid = cell_id(row, col)
            try:
                cell_id_result, result, was_cached = future.result()
                results[cell_id_result] = result
                if was_cached:
                    skipped += 1
                elif "error" in result:
                    errors += 1
                    print(f"  {cid}: ERROR - {result['error'][:80]}")
                else:
                    done += 1
                    n = result.get("totalCircles", "?")
                    print(f"  {cid}: {n} circles")
            except Exception as e:
                errors += 1
                results[cid] = {"error": str(e)}
                print(f"  {cid}: EXCEPTION - {str(e)[:80]}")

            # Save after each result (crash-safe)
            with open(RESULTS_FILE, "w") as f:
                json.dump(results, f, indent=2)

    print(f"\nDone: {done} new, {skipped} cached, {errors} errors")
    print(f"Results saved to {RESULTS_FILE}")

    # Print summary
    total_circles = 0
    for cid_key in sorted(results.keys()):
        r = results[cid_key]
        if "error" not in r:
            n = r.get("totalCircles", 0)
            total_circles += n
            labels = [p["label"] for p in r.get("plantings", [])]
            print(f"  {cid_key}: {n} circles - {', '.join(labels[:5])}")
    print(f"\nTotal circles across all cells: {total_circles}")


if __name__ == "__main__":
    main()
