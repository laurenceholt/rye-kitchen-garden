#!/usr/bin/env python3
"""Generate transparent PNG plant images using OpenAI gpt-image-1."""

import os
import re
import sys
import base64
import time
from pathlib import Path
from openai import OpenAI

API_KEY = os.environ.get("OPENAI_API_KEY", "")
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "plant-images"
PLANT_DB_FILE = PROJECT_ROOT / "src" / "data" / "plantDatabase.ts"


def parse_plants_from_db(db_file: Path) -> list[dict]:
    """Extract id and commonName from plantDatabase.ts."""
    content = db_file.read_text()
    plants = []
    for match in re.finditer(
        r"id:\s*'([^']+)'.*?commonName:\s*'([^']+)'",
        content,
        re.DOTALL,
    ):
        plants.append({"id": match.group(1), "commonName": match.group(2)})
    return plants


def generate_plant_image(client: OpenAI, common_name: str) -> bytes | None:
    """Generate a transparent PNG of the plant."""
    prompt = (
        f"A single {common_name} plant viewed from slightly above at eye level, "
        f"showing the full plant from soil to top. Botanical illustration style, "
        f"realistic proportions and colors. The plant should be centered and "
        f"fill most of the frame vertically. Transparent background."
    )

    response = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        n=1,
        size="1024x1024",
        quality="medium",
        background="transparent",
        output_format="png",
    )

    image_b64 = response.data[0].b64_json
    if image_b64:
        return base64.b64decode(image_b64)
    return None


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    client = OpenAI(api_key=API_KEY)

    plants = parse_plants_from_db(PLANT_DB_FILE)
    print(f"Found {len(plants)} plants in database")

    # Filter to specific IDs if provided as args
    if len(sys.argv) > 1:
        target_ids = set(sys.argv[1:])
        plants = [p for p in plants if p["id"] in target_ids]
        print(f"Filtered to {len(plants)} target plants")

    generated = 0
    skipped = 0
    errors = 0

    for i, plant in enumerate(plants):
        output_path = OUTPUT_DIR / f"{plant['id']}.png"
        if output_path.exists():
            skipped += 1
            print(f"  [{i+1}/{len(plants)}] {plant['id']}: exists, skipping")
            continue

        print(f"  [{i+1}/{len(plants)}] Generating {plant['commonName']}...")
        try:
            image_data = generate_plant_image(client, plant["commonName"])
            if image_data:
                output_path.write_bytes(image_data)
                generated += 1
                print(f"    Saved {output_path.name} ({len(image_data):,} bytes)")
            else:
                errors += 1
                print(f"    No image returned for {plant['id']}")
        except Exception as e:
            errors += 1
            print(f"    ERROR: {e}")

        time.sleep(1)  # Rate limiting

    print(f"\nDone: {generated} generated, {skipped} skipped, {errors} errors")
    print(f"Images saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
