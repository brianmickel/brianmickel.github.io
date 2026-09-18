# brianmickel.io

Eleventy site, deployed to GitHub Pages from the `gh-pages` branch on every push to `master`.

```
npm install
npm run serve     # local dev at http://localhost:8080
npm run build     # writes _site/
```

## Adding an entry

Drop a Markdown file in `src/projects/`:

```
---
title: Thing I built
date: 2024-03-01          # when it was originally built, not when written up
category: energy          # energy | games | cas | cycling  (see src/_data/categories.json)
repo: https://github.com/brianmickel/thing
live: https://…           # optional
summary: One line for the index.
---

Body is optional. Markdown.
```

Categories live in `src/_data/categories.json`; each gets its own page at `/<slug>/`.
