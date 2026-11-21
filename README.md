# Data Structures & Algorithms: The Grader Course

A self-study course for learning data structures and algorithms in C++, built around a set of 127 grader problems, plus an interactive visualizer that shows what happens in memory step by step.

## What's inside

| Folder | What it is |
|---|---|
| [`course/`](course/README.md) | 18 lessons, from C++ basics and Big-O to graphs, shortest paths and MST. Start with [course/README.md](course/README.md). |
| [`course/problem-map.md`](course/problem-map.md) | Every grader problem mapped to its lesson, difficulty and key idea. |
| [`course/problem-solving-method.md`](course/problem-solving-method.md) | A step-by-step method for attacking a new problem. |
| [`visualizer/memory-lab.html`](visualizer/memory-lab.html) | **C++ Memory Lab**: an interactive, bilingual (EN/TH) visualizer of stack frames, heap blocks and pointers for 43 scenarios, from variables to Dijkstra. |
| [`solutions/grader-solutions.html`](solutions/grader-solutions.html) | **Grader Solutions Book**: 61 grader problems (including the new **Structure 68** mock-exam category), each with the statement in plain words, the key idea, complete tested code, a step-by-step trace, common traps and the matching lesson. Bilingual (EN/TH), one self-contained file. |
| [`solutions/final-grader-solutions.html`](solutions/final-grader-solutions.html) | **Final Data Algorithm Grader Solution**: 40 algorithm problems from the final-exam list in 8 chapters (brute force, sorting, divide & conquer, DP, graphs, MST, shortest paths, final preparation), easier to harder. Each chapter opens with a primer (technique, code template, how to spot it); each problem has hints, complete tested code, a trace, traps and background. Bilingual (EN/TH), one self-contained file. |
| `solutions/final-src/` | Source of the final book: `c/` chapter primers, `p/` pages, `sol/` solutions, `t/` tests (samples + 300 random brute-force checks each). Rebuild with `python3 build.py`; `node checkall.js` checks every page. |
| `solutions/src/` | Source of the book: `p/` page texts, `sol/` the exact solutions shown, `t/` their test scripts (samples + random brute-force checks). Rebuild with `python3 build.py`. |
| `visualizer/src/memlab-source.tgz` | Source for the Memory Lab (build with `python build.py`). |

## Open the Memory Lab

- **Online:** if GitHub Pages is on for this repo, open `https://<your-username>.github.io/<repo-name>/visualizer/memory-lab.html`.
- **Offline:** download `visualizer/memory-lab.html` and open it in any browser. It is a single self-contained file.
