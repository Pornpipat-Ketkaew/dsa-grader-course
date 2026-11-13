# Data Structures & Algorithms: The Grader Course

> A complete course built around the **127 grader problems** in `C:\dataAlgoGraderProblems`.
> Read it from Lesson 01 to Lesson 18. When you finish, you should be able to solve every problem in this folder on your own.

---

## How this course is organised

The course has three parts.

| Part | Lessons | What you learn |
|---|---|---|
| **I. Foundations** | 01–02 | C++ for graders, complexity analysis, the STL |
| **II. Data structures** (the `d…`, `ds…` and `da6x_m…` problems) | 03–07 | How `CP::vector`, `CP::stack`, `CP::queue`, `CP::list`, `CP::priority_queue` and `CP::map_bst` work *inside*, and how to add new member functions to them in `student.h` |
| **III. Algorithms** (the `ex…`, `a…` and `da6x_f…` problems) | 08–18 | Searching, sorting, recursion, divide & conquer, greedy, dynamic programming, graphs |

Lesson files:

| # | File | Topic |
|---|---|---|
| 01 | [01-cpp-and-complexity.md](01-cpp-and-complexity.md) | C++ toolkit for the grader, Big-O, overflow, fast I/O, how `student.h` problems work |
| 02 | [02-stl.md](02-stl.md) | STL containers and algorithms you must know by heart |
| 03 | [03-cp-vector.md](03-cp-vector.md) | Dynamic arrays: `CP::vector` internals and the vector problems |
| 04 | [04-cp-stack-queue.md](04-cp-stack-queue.md) | `CP::stack` and the circular-buffer `CP::queue` |
| 05 | [05-cp-list.md](05-cp-list.md) | Doubly linked list with a sentinel: `CP::list` pointer surgery |
| 06 | [06-heap-priority-queue.md](06-heap-priority-queue.md) | Binary heaps: `CP::priority_queue`, comparators, index arithmetic |
| 07 | [07-trees-bst.md](07-trees-bst.md) | Binary trees and `CP::map_bst`: recursion on trees |
| 08 | [08-binary-search-prefix-sums.md](08-binary-search-prefix-sums.md) | Binary search (on arrays and on answers), prefix sums |
| 09 | [09-sorting-hashing-counting.md](09-sorting-hashing-counting.md) | Sorting, maps, hashing, counting, coordinate tricks |
| 10 | [10-sweep-two-pointers-kadane.md](10-sweep-two-pointers-kadane.md) | Sweep line, interval union, two pointers, Kadane |
| 11 | [11-recursion-backtracking.md](11-recursion-backtracking.md) | Recursion, generating all solutions, backtracking and pruning |
| 12 | [12-divide-and-conquer.md](12-divide-and-conquer.md) | Divide & conquer, fast exponentiation, recursive structures |
| 13 | [13-greedy.md](13-greedy.md) | Greedy algorithms and how to prove them |
| 14 | [14-dp-basics.md](14-dp-basics.md) | Dynamic programming I: memoisation, tables, the classics |
| 15 | [15-dp-states.md](15-dp-states.md) | Dynamic programming II: designing states, counting mod p, bitmask DP |
| 16 | [16-graphs-bfs-dfs.md](16-graphs-bfs-dfs.md) | Graph representations, BFS, DFS, components, cycles, grids |
| 17 | [17-shortest-paths.md](17-shortest-paths.md) | Dijkstra, Bellman-Ford, Floyd-Warshall |
| 18 | [18-mst-dsu.md](18-mst-dsu.md) | Minimum spanning trees, Prim, Kruskal, union-find |

Reference files:

* [problem-map.md](problem-map.md): **every one of the 127 problems**, with its topic, the lesson that teaches it, the key idea, and a difficulty rating. Use it as your practice list.
* [problem-solving-method.md](problem-solving-method.md): the step-by-step method for attacking a new grader problem, including how to read constraints and pick the algorithm, plus a checklist for debugging Wrong Answer, TLE, MLE and Runtime Error.

---

## How to study each lesson

Every lesson follows the same layout:

1. **Why it matters.** The problems this lesson unlocks.
2. **Theory.** The idea, explained from first principles.
3. **C++ code.** Small, complete, correct examples you should type out yourself. Don't copy and paste them.
4. **Complexity.** Time and memory, and *why*.
5. **Common traps.** The mistakes that cost points in the grader.
6. **Grader problems for this lesson.** Each with a hint that points you in the right direction without giving the full answer.
7. **Exercises.** Short questions to check your understanding, with answers at the bottom of the file.

**Recommended routine for every lesson**

1. Read the theory slowly, and draw pictures on paper (arrays, pointers, trees).
2. Type out the example code and run it.
3. Do the exercises without looking at the answers.
4. Solve the listed grader problems in the order given (easy to hard). Spend at least 30 minutes on a problem before you read the hint.
5. When you're stuck, type the problem's name in the chat. I'll restate the problem, explain what it *really* asks, then go through the what, why and how, the algorithm, and the knowledge behind it.

---

## Suggested 6-week schedule

| Week | Lessons | Grader focus |
|---|---|---|
| 1 | 01, 02, 08 | `ex00e3`, `ex00e4`, `ex01e3`, `ex02e3`, `ex01m3`, `d63_q1b_interval_count`, `da68_m_count_value` |
| 2 | 03, 04 | all `CP::vector`, `CP::stack`, `CP::queue` problems |
| 3 | 05, 06, 07 | all `CP::list`, heap and BST problems |
| 4 | 09, 10, 11, 12 | sorting, sweep, backtracking, divide & conquer problems |
| 5 | 13, 14, 15 | greedy and DP problems |
| 6 | 16, 17, 18 | graph problems, then mixed revision from `problem-map.md` |

---

## Problem naming in this folder (what the prefixes mean)

| Prefix | Meaning | Typical content |
|---|---|---|
| `ex00…ex07` | weekly exercises | basic algorithms by topic (ex02 = DP, ex04 = greedy, ex05 = graph search, ex06 = shortest path/MST, ex07 = backtracking) |
| `ds00…ds04` | data structure exercises | modify a CP container |
| `d57…d65` | data structure exams (years 2557–2565) | add a function to `CP::vector/stack/queue/list/priority_queue/map_bst` in `student.h` |
| `a58…a66` | algorithm exams (years 2558–2566) | write a whole program (`main`) |
| `da66…da68` | combined course exams (2566–2568); `_m` = midterm (data structures), `_f` = final (algorithms) | both kinds |

Two kinds of problems:

* **"student.h" problems.** You get `main.cpp` and a container header such as `vector.h`, and you write *only* the body of one member function in `student.h`. The grader compiles its own `main.cpp` together with your file. See Lesson 01 §6.
* **"full program" problems.** You write the whole `main()`: read stdin, print stdout.

Good luck! 🚀
