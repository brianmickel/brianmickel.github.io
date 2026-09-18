# brianmickel.io

Eleventy site, deployed to GitHub Pages from the `gh-pages` branch on every push to `master`.

```
npm install
npm run serve     # local dev at http://localhost:8080
npm run build     # writes _site/
```

## Adding an entry

Sections are kinds of thing; each has a directory under `src/` and a page at `/<section>/`:

| directory       | kind    | page        |
|-----------------|---------|-------------|
| `src/projects/` | project | `/projects/` |
| `src/notes/`    | note    | `/notes/`    |
| `src/links/`    | link    | `/links/`    |
| `src/lab/`      | lab     | `/lab/`      |
| `src/changes/`  | change  | `/changes/`  |

Drop a Markdown file in the right directory; the directory's `.json` sets the kind and layout.

```
---
title: Thing I built
date: 2024-03-01          # when it was originally built, not when written up
topics: [energy]          # any of: energy, games, cas, cycling  (src/_data/topicList.json)
repo: https://github.com/brianmickel/thing
live: https://…           # optional
summary: One line for the index.
---

Body is optional. Markdown.
```

Links are one-liners that point outward and get no page of their own — use `link:` instead of `repo:`:

```
---
title: Magnet Type
date: 2026-09-17
link: https://magnettype.com/
summary: Per-glyph variable-font cursor fields, done right.
---
```

Topics are tags, not sections: they show on rows and entries and each has a filter page at `/topics/<slug>/`. `now.md` and `about.md` are standalone pages.
