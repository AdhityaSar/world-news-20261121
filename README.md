# Saturday 21 November 2026 — one sheet, twelve stories

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/AdhityaSar/world-news-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/AdhityaSar/world-news-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

## What this is

`entry.png` is a 1024×1024 front page for a single day of world news: Saturday
21 November 2026. It carries a masthead with a locator map of all twelve
datelines, seven desk tabs, twelve picture cards, an "Also on Saturday" strip of
twelve more headlines, a band of six figures from six further stories, and a
footer that says plainly which big stories belong to the days before.

## Where the page comes from

The sheet is `src/page.html`: one file, one `<style>` block, no `<img>`, no
external stylesheet, no web font and no network access of any kind. Every card
picture is drawn inline as SVG — skylines, a tanker, a robot head, stumps at the
MCG, a planet with a probe on its orbit — and each of those drawings carries its
own label inside the picture, set as `<text>` at 10–14px, naming the place and
the number it stands for (`KYIV` / `400 DRONES`, `BAYELSA` / `300 MISSING`). The
labels are part of the artwork, not a caption underneath it, so a card still
reads correctly when the sheet is shrunk to thumbnails.

Typesetting is Georgia with Times New Roman as the fallback, on a warm off-white
page with white cards, 22px gutters between columns and 18px between rows.

Reports were drawn from the day's wire copy and broadsheet coverage — AP,
Reuters, AFP, BBC, Al Jazeera, The Guardian and others — and every figure on the
sheet is taken from that reporting. Nothing is projected or invented. Three
stories that broke before the day (the ICJ genocide ruling of 19 November, the
Anthropic IPO pricing, and the GTA VI launch) are deliberately kept off the cards
and named in the footer's date check instead.

## How it is published

`main.ts` is the whole program. It resolves its own directory from
`import.meta.url` (never the working directory), reads the destination from
`MAKEFUN_OUTPUT_DIR` and falls back to `/output`, creates the directory if it is
missing, empties the directory's *contents* one entry at a time, and then copies
the committed `entry.png` beside it with `copyFileSync`.

Emptying contents rather than the directory itself matters: on the build host the
output path is a mount point, so removing it and recreating it would fail with
`EPERM`. Because the bytes are copied from a file committed to the repository,
two runs produce identical output.

```sh
MAKEFUN_OUTPUT_DIR=/output node main.ts
```

Node 22, standard library only, no dependencies and no `package.json`.

## Rendering

`src/page.html` is the source of record. `entry.png` was rendered from it in
headless Chrome at a 1024×1024 window and committed, so the picture and the page
never drift apart. To regenerate after an edit, point a headless browser at
`src/page.html` with `--window-size=1024,1024` and write the screenshot over
`entry.png`.

## Licence

MIT, © 2026 Adhitya Sar. See `LICENSE`.
