---
title: News
cms_exclude: true

# View.
#   1 = List
#   2 = Compact
#   3 = Card
view: news

# Show all news entries on /news/ (disable 10-per-page pagination).
paginate: 1000

# Optional header image (relative to `static/media/` folder).
header:
  caption: ''
  image: ''

cascade:
  # Target only the individual news items, so the `/news/` archive page itself
  # still renders while each item stays list-only (no thin standalone page).
  - _target:
      kind: page
    _build:
      list: true
      render: false
---
