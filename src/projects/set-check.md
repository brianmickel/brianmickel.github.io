---
title: Set Check
date: 2025-12-14
category: games
repo: https://github.com/brianmickel/set-check
live: https://brianmickel.io/set-check/
summary: Photograph the board, find out whether a set remains.
---

Is there a set left? A quick tool to confirm there isn't one on the board before you call it.

Take a photo of the cards, the app identifies them and answers "has set?". React and Vite on the front end, a Cloudflare Worker handling upload and analysis with OpenAI Vision behind it.

This is the second time I've built this. The [first](/projects/set-game-set-finder/) was a 2018 Python CLI that took the cards as a text file, and whose readme already listed "image upload to website" as stage three of the plan.
