# How & Solution: sources

- `site/p/<id>.md`: page text (EN and TH), `site/c/<chapter>.md`: chapter toolkits, `site/home.md`: home page text.
- `site/sol/<id>/`: the exact solution files shown on each page.
- `site/viz/<id>.js`: the step-by-step concept visualizers (engine in `site/assets/site.js`).
- `site/t/<id>/run.sh`: tests for each solution: PDF samples, a brute force or independent checker on random inputs (`gen.py`, `brute.py`), and the largest allowed inputs with timing. `code/` holds the starter files of the problems that come with a `main.cpp`.

Build: `cd site && python3 build.py` (needs Python `markdown` and `pygments`), output in `site/out/algorithms/`.
Test one problem: `bash site/t/<id>/run.sh`. Check every page and every visualizer frame: `node site/checkall.js` (needs Playwright).
