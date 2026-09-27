#!/usr/bin/env bash
#
# Render `featured*.pdf` figures under `content/` into PNGs that Hugo can pick
# up as featured images.
#
# Hugo cannot read PDFs, so drop `featured.pdf` (a vector figure exported from
# LaTeX, say) next to a page's `index.md` and this script writes
# `featured.pdf.png` beside it. The theme's `*featured*` glob then finds the
# PNG. Generated files are gitignored and re-rendered on every build.
#
# Usage:
#   scripts/render-pdf-figures.sh          # render what is out of date
#   FORCE=1 scripts/render-pdf-figures.sh  # re-render everything
#   WIDTH=2400 scripts/render-pdf-figures.sh

set -euo pipefail

cd "$(dirname "$0")/.."

WIDTH="${WIDTH:-1600}"
FORCE="${FORCE:-}"

renderer=""
if command -v pdftoppm >/dev/null 2>&1; then
    renderer="pdftoppm"
elif command -v pdftocairo >/dev/null 2>&1; then
    renderer="pdftocairo"
elif command -v magick >/dev/null 2>&1 && command -v gs >/dev/null 2>&1; then
    renderer="magick"
elif command -v sips >/dev/null 2>&1; then
    renderer="sips"
fi

render() { # $1 = source pdf, $2 = target png
    case "$renderer" in
    pdftoppm)
        pdftoppm -png -transp -singlefile -f 1 -l 1 \
            -scale-to-x "$WIDTH" -scale-to-y -1 "$1" "${2%.png}"
        ;;
    pdftocairo)
        pdftocairo -png -transp -singlefile -f 1 -l 1 \
            -scale-to-x "$WIDTH" -scale-to-y -1 "$1" "${2%.png}"
        ;;
    magick)
        magick -density 300 -background none "$1[0]" -resize "${WIDTH}x>" "$2"
        ;;
    sips)
        # Renders at the PDF's natural size only, so previews are lower
        # resolution than the CI build. Fine for `hugo server`.
        sips -s format png "$1" --out "$2" >/dev/null
        ;;
    esac
}

if [ -z "$renderer" ]; then
    echo "render-pdf-figures: no PDF renderer found." >&2
    echo "  Install poppler (brew install poppler / apt-get install poppler-utils)." >&2
    exit 1
fi

rendered=0
skipped=0

while IFS= read -r -d '' pdf; do
    png="$pdf.png"
    if [ -z "$FORCE" ] && [ -f "$png" ] && [ ! "$pdf" -nt "$png" ]; then
        skipped=$((skipped + 1))
        continue
    fi
    render "$pdf" "$png"
    echo "render-pdf-figures: $pdf -> $png"
    rendered=$((rendered + 1))
done < <(find content -type f -name 'featured*.pdf' -print0)

echo "render-pdf-figures: $rendered rendered, $skipped up to date (via $renderer)"
