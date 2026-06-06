#!/bin/bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
HTML="$DIR/Neuro Daily Carousel - Lupa Nama Orang.html"
PNG_DIR="$DIR/Exports"
mkdir -p "$PNG_DIR"
echo "Exporting 7 slides → 1080×1350..."
for i in $(seq 1 7); do
  N=$(printf "%02d" $i)
  RAW="$PNG_DIR/slide-$N-raw.png"
  CROP="$PNG_DIR/slide-$N-crop.png"
  OUT="$PNG_DIR/slide-$N.png"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=3 \
    --screenshot="$RAW" \
    --window-size=440,630 \
    "file://$HTML?slide=$i" 2>/dev/null
  sips --cropToHeightWidth 1650 1320 "$RAW" --out "$CROP" > /dev/null 2>&1
  sips -z 1350 1080 "$CROP" --out "$OUT" > /dev/null 2>&1
  rm -f "$RAW" "$CROP"
  echo "  ✓ slide-$N.png"
done
echo "Done! $(ls "$PNG_DIR"/*.png | wc -l | tr -d ' ') slides exported."
