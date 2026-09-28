# changhun.kim

Personal academic homepage, built with [Hugo](https://gohugo.io/) (extended,
v0.121) on the [Wowchemy v5](https://github.com/wowchemy/wowchemy-hugo-themes)
theme, which is vendored under `_vendor/`. Everything is on one page.

## Run locally

```sh
scripts/render-pdf-figures.sh   # only needed when a featured.pdf changes
hugo server
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages
(`.github/workflows/hugo.yml`).

## Editing content

| What | Where |
| --- | --- |
| Name, photo, bio, social links | `content/authors/admin/_index.md`, `avatar.jpg` |
| News | `content/news/<slug>/index.md`: `title`, `date`, `kind` (paper, award, milestone, travel) |
| Publications | `content/publications/<slug>/index.md`; `featured: true` puts it under "Selected" |
| Publication figure | `featured.png` (or `featured.pdf`, rendered to PNG) next to `index.md` |
| Education, Employment | `content/education/`, `content/employment/` (logos in `assets/media/icons/brands/`) |
| Awards, Teaching, Service, Talks | `content/awards/` etc.: `title`, `organization`, `period`, `weight` |
| Order of sections | `content/_index.md` |
| Navbar links | `config/_default/menus.yaml` |
| CV | `static/uploads/CV_ChanghunKim.pdf` |

## Code layout

- `layouts/partials/blocks/site.*.html`: the home-page blocks (about, news,
  publications, timeline, list).
- `layouts/partials/site/`: shared pieces (section title, publication row,
  link pills, CV grouping).
- `layouts/partials/components/headers/navbar.html`: navbar override.
- `layouts/404.html`: sends old URLs to the matching section.
- `assets/scss/custom.scss` imports `assets/scss/site/*`; colours are CSS
  variables in `site/_tokens.scss` (light and dark).
- `assets/js/site.js`: interactions (Selected/All, news paging, lightbox,
  navbar pill, theme toggle, scroll reveal).
- `data/themes/custom_green.toml`, `data/fonts/inter.toml`: theme palette and fonts.
