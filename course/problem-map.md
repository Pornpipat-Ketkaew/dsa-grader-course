# Problem Map: All 127 Grader Problems

Use this as your practice list. **Difficulty:** ★☆☆ warm-up · ★★☆ standard exam · ★★★ hard.

**Type:** *student.h* = add a member function to a CP container; *full program* = write `main`; *class file* = complete a given class file.

When you get stuck on any problem, type its name (for example `d59_q3_bst_split`) in the chat for a full explanation.

## Part A: By lesson (recommended study order)

### Lesson 02: STL ([02-stl.md](02-stl.md)), 2 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d63_q1a_multi_insert` | Vector Multiple Add | student.h | ★☆☆ | single insert(it, count, value) |
| ☐ | `da66_m2_change_data` | Change Data | student.h | ★★★ | navigate nested STL containers |

### Lesson 03: CP::vector ([03-cp-vector.md](03-cp-vector.md)), 11 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d63_q2a_pair_gte` | Pair GTE | student.h | ★☆☆ | lexicographic >= without < or == |
| ☐ | `d63_q2b_vector_compress` | Vector Compress | student.h | ★☆☆ | shrink capacity to size |
| ☐ | `da67_m_count_distinct` | Vector Count Distinct | student.h | ★☆☆ | copy + sort + count |
| ☐ | `ds00_reverse2` | Reverse Vector 2 | student.h | ★☆☆ | two-pointer swap on iterators |
| ☐ | `d58_q1_erase_many` | Erase Many from Vector | student.h | ★★☆ | one-pass compaction |
| ☐ | `d60_q1_v_uniq` | Vector Unique | student.h | ★★☆ | seen-set + compaction |
| ☐ | `d64_q2a_vector_block_swap` | Vector Block Swap | student.h | ★★☆ | validate ranges then swap |
| ☐ | `da68_m2_vector_range_aggregate` | Vector Range Aggregate | student.h | ★★☆ | nth_element median, shift tail |
| ☐ | `d59_q1_range_insert` | Range Insert | student.h | ★★★ | index before realloc, copy source first |
| ☐ | `d62_q2b_vector_insert_many` | Insert Many to Vector | student.h | ★★★ | sort requests, rebuild in one pass |
| ☐ | `da68_m_compressed_vector` | Compressed Vector | student.h | ★★★ | run-length insert/split/merge |

### Lesson 04: Stack & queue ([04-cp-stack-queue.md](04-cp-stack-queue.md)), 11 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d60_q1_qat` | Queue At | student.h | ★☆☆ | (mFront+k)%mCap, negative k |
| ☐ | `d62_q2b_stack_deep_push` | Stack Deep Push | student.h | ★☆☆ | insert at index mSize-pos |
| ☐ | `d62_q3b_queue_m2f` | Queue Move To Front | student.h | ★★☆ | shift with circular indices |
| ☐ | `d63_q3a_queue_m2b` | Queue Move To Back | student.h | ★★☆ | shift with circular indices |
| ☐ | `d64_q3b_queue_reverse` | Queue Reverse | student.h | ★★☆ | two pointers with at(i) |
| ☐ | `d65_q2a_mitosis` | Stack Mitosis | student.h | ★★☆ | one expand, fill from top down |
| ☐ | `da66_m1_queue_remove_many` | Queue Remove Many | student.h | ★★☆ | mark + compact circular buffer |
| ☐ | `da67_m2_queue_insert_shuffle` | Queue Insert Shuffle | student.h | ★★☆ | rebuild circular array |
| ☐ | `da67_m_queue_block_insert` | Queue Block Insert | student.h | ★★☆ | rebuild or shift shorter side |
| ☐ | `da68_m_stack_of_stack` | Stack Of Stack | student.h | ★★☆ | blocks of size i+1 |
| ☐ | `d65_q3b_queue_total_reverse` | Queue Total Reverse | student.h | ★★★ | O(1) reverse flag aux |

### Lesson 05: CP::list ([05-cp-list.md](05-cp-list.md)), 7 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `da68_m_list_wrog_prev` | List Wrong Prev | student.h | ★☆☆ | one pass fixing prev |
| ☐ | `d57_q3_shift` | List Shift | student.h | ★★☆ | move the header node |
| ☐ | `d58_q3_list_replace` | List Replace | student.h | ★★☆ | insert copies of y, erase x |
| ☐ | `d61_q2_splitlist` | Split List | student.h | ★★☆ | split chain at ceil(n/2), no new nodes |
| ☐ | `d64_q4a_list_merge` | List Merge | student.h | ★★☆ | O(1) splice per list |
| ☐ | `da67_m2_list_zigzag` | List Zigzag | student.h | ★★☆ | interleave by relinking |
| ☐ | `ds04_playlist` | Playlist Management | student.h | ★★★ | collect node pointers, relink |

### Lesson 06: Heap ([06-heap-priority-queue.md](06-heap-priority-queue.md)), 8 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d63_q3a_rank_in_heap` | Rank in Heap | student.h | ★☆☆ | count mLess(x, mData[i]) |
| ☐ | `d58_q2_custom` | Custom Order | student.h | ★★☆ | comparators for CP::priority_queue |
| ☐ | `d62_q3a_heap_descendant` | Heap Descendant | full program | ★★☆ | level ranges [2l+1, 2r+2] |
| ☐ | `d64_q3a_heap_kth` | Heap K-th | student.h | ★★☆ | candidates at indices 0..6 |
| ☐ | `da66_m1_heap_before_node` | Heap Before Node | full program | ★★☆ | all except m and descendants |
| ☐ | `da68_m_heap_child_swap` | Heap Child Swap | student.h | ★★☆ | level-by-level block swap |
| ☐ | `ds03_heap_erase` | Heap Erase | student.h | ★★☆ | replace with last, fixUp + fixDown |
| ☐ | `da68_m2_ordered_heap_reconstruction` | Ordered Heap Reconstruction | student.h | ★★★ | top-down subtree-swap simulation |

### Lesson 07: Trees & BST ([07-trees-bst.md](07-trees-bst.md)), 11 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d58_q3_unary` | Count Unary Node | student.h | ★☆☆ | tree recursion (XOR of children) |
| ☐ | `d60_q3_same_tree` | Same Tree | class file | ★☆☆ | structural recursion, no STL |
| ☐ | `d63_q4a_leaves_count` | Leaves Count | student.h | ★☆☆ | tree recursion |
| ☐ | `ds04_best_bst` | Generate Optimal BST | student.h | ★☆☆ | insert medians recursively |
| ☐ | `d61_q2_imbalance` | Imbalance | student.h | ★★☆ | postorder heights + best (tie: min key) |
| ☐ | `d64_q4a_subtree` | Subtree Extract | student.h | ★★☆ | move subtrees, parents, sizes |
| ☐ | `da66_m1_tree_leaves_depth` | Tree Leaves Depth | student.h | ★★☆ | depth passed down; beware deep recursion |
| ☐ | `da66_m2_furthest_distance` | Furthest Distance | student.h | ★★☆ | diameter via heights |
| ☐ | `da67_m2_bst_parity_score` | BST Parity Score | student.h | ★★☆ | DFS with depth limit |
| ☐ | `da67_m_bst_lca` | BST Lowest Common Ancestor | student.h | ★★☆ | BST walk or parent lifting |
| ☐ | `d59_q3_bst_split` | BST Split | student.h | ★★★ | O(h) split by key, fix parents & sizes |

### Lesson 08: Binary search & prefix sums ([08-binary-search-prefix-sums.md](08-binary-search-prefix-sums.md)), 10 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d63_q1b_interval_count` | Interval Count | full program | ★☆☆ | sort + lower/upper_bound |
| ☐ | `da68_m_count_value` | Count Value in Map | student.h | ★☆☆ | sorted values + bounds |
| ☐ | `ex01e3` | Binary Search Near | full program | ★☆☆ | manual binary search: largest <= x |
| ☐ | `ex02e3_bs` | Binary Search Near Repeat | full program | ★☆☆ | last index with A[i] <= x |
| ☐ | `a64_q1_lawn_mowing` | Lawn Mowing | full program | ★★☆ | prefix sums of A+k, upper_bound |
| ☐ | `a65_q2a_huge_array` | Huge Array | full program | ★★☆ | sort runs, prefix counts, lower_bound |
| ☐ | `d63_q1a_hiatus` | Hiatus | full program | ★★☆ | encode y*12+m, predecessor search |
| ☐ | `d65_q1c_ice_cream` | Saving for Ice Cream | full program | ★★☆ | cumulative savings + lower_bound |
| ☐ | `da67_m_chocolate_truffle` | Chocolate Truffle | full program | ★★☆ | linearise cells (ll), wrap-around search |
| ☐ | `ex01m3` | Restaurant | full program | ★★☆ | binary search on time: sum(t/Ti+1) >= c |

### Lesson 09: Sorting, hashing, counting ([09-sorting-hashing-counting.md](09-sorting-hashing-counting.md)), 6 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `d62_q1a_vote` | Election Winner | full program | ★☆☆ | map counts, sort desc, K-th |
| ☐ | `ex00e3` | Check Mapping | full program | ★☆☆ | seen-array, range check |
| ☐ | `a66_q2a_insertion_count` | Insertion Sort Count | full program | ★★☆ | earlier elements greater than k |
| ☐ | `d61_q1_ordered_set` | Union/Intersection of Ordered Set | student.h | ★★☆ | hash-set membership, keep order |
| ☐ | `d62_q1b_grandfather` | Grandfather | full program | ★★☆ | unordered_map parent of parent |
| ☐ | `ex04m1_sort` | 3 Values Sort | full program | ★★☆ | zone counts: 2-cycles then 3-cycles |

### Lesson 10: Sweep, two pointers, Kadane ([10-sweep-two-pointers-kadane.md](10-sweep-two-pointers-kadane.md)), 4 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a60b_q1_diagsum` | Diagonal Sum | full program | ★★☆ | Kadane on each diagonal |
| ☐ | `da68_m2_interesting_events` | Interesting Events | full program | ★★☆ | sweep line + binary search |
| ☐ | `d57_q3_zuma` | Zuma | full program | ★★★ | expand two pointers from insertion point |
| ☐ | `da66_m1_line_monopoly` | Line Monopoly | full program | ★★★ | map of merged intervals + counter |

### Lesson 11: Recursion & backtracking ([11-recursion-backtracking.md](11-recursion-backtracking.md)), 10 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `ex00e4` | Generate Barcode | full program | ★☆☆ | combinations by backtracking |
| ☐ | `ex00e5` | Consecutive Ones | full program | ★☆☆ | all n-bit strings in order + run check |
| ☐ | `a64_q1_permu_before` | Permutation with Constraint | full program | ★★☆ | permutation backtracking + predecessor check |
| ☐ | `da66_f1_map_walk` | Map Walk | full program | ★★☆ | DFS in order A,B,C; print as you go |
| ☐ | `da67_f_abc_permutation` | ABC Permutation | full program | ★★☆ | limited-letter backtracking, count first |
| ☐ | `da68_f_abcd_permutation` | ABCD Permutation | full program | ★★☆ | limited-letter backtracking |
| ☐ | `ex07e1_nqueen` | n-Queen | full program | ★★☆ | backtracking with column/diagonal flags |
| ☐ | `a64_q4_path_sum` | Path Sum | full program | ★★★ | DFS all simple paths, mark sums |
| ☐ | `a65_q1_tower_defense` | Tower Defense | full program | ★★★ | assign towers by backtracking |
| ☐ | `ex07e3_coloring` | Graph Coloring | full program | ★★★ | backtracking k colours, symmetry pruning |

### Lesson 12: Divide & conquer ([12-divide-and-conquer.md](12-divide-and-conquer.md)), 4 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a60_q1_matmod` | Matrix Modulo | full program | ★★☆ | fast matrix power |
| ☐ | `a62_q1a_recur` | Recur Matrix | full program | ★★☆ | fill quadrants recursively |
| ☐ | `a62_q1b_virus` | Virus Check | full program | ★★☆ | recursive check incl. reversed half |
| ☐ | `a63_q1b_virus2` | Virus 2 | full program | ★★☆ | D&C + prefix sums of ones |

### Lesson 13: Greedy ([13-greedy.md](13-greedy.md)), 6 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a58_m_p4` | Class Selection | full program | ★☆☆ | greedy by finish time |
| ☐ | `ex04e1_interval` | Class Selection | full program | ★☆☆ | greedy by finish time |
| ☐ | `ex04e2_fknapsack` | Fractional Knapsack | full program | ★☆☆ | greedy by v/w, doubles |
| ☐ | `a60b_mid_p1_buffet` | Buffet Line | full program | ★★☆ | greedy lamp at p+w |
| ☐ | `da67_m2_dungeon` | Welcome to the Dungeon | full program | ★★☆ | cheapest dungeon per item (min-heaps) |
| ☐ | `da68_f_game_of_trades` | Game of Trade | full program | ★★★ | best/2nd-best sell, greedy units |

### Lesson 14: DP I ([14-dp-basics.md](14-dp-basics.md)), 10 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `da66_f1_linear_recurrence` | Linear Recurrence | full program | ★☆☆ | iterative O(nk) mod 32717 |
| ☐ | `ex02e1_fibo` | Fibonacci | full program | ★☆☆ | memo / iterative DP |
| ☐ | `ex02e2_cnk` | Binomial Coefficient | full program | ★☆☆ | Pascal's rule |
| ☐ | `ex02m1_triangle` | Number Triangle | full program | ★☆☆ | bottom-up DP |
| ☐ | `a62_q1b_chocolate` | Chocolate | full program | ★★☆ | composition-count DP mod p |
| ☐ | `da68_f2_sackknap` | SackKnap | full program | ★★☆ | exact-weight min-price knapsack, ll |
| ☐ | `da68_f2_zero_one_subset_sum` | 0-1 Subset Sum | full program | ★★☆ | DP (ones used, sum) |
| ☐ | `da68_f_hidden_palindrome` | Hidden Palindrome | full program | ★★☆ | LPS interval DP / LCS with reverse |
| ☐ | `ex03e1_lcs` | Longest Common Subsequence | full program | ★★☆ | LCS table O(nm) |
| ☐ | `ex07e2_iss` | Increasing Sequence Sum | full program | ★★☆ | partition counting DP |

### Lesson 15: DP II (states) ([15-dp-states.md](15-dp-states.md)), 4 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a64_q2_table_no_11` | Table no 11 | full program | ★★☆ | DP over last column (3 states) |
| ☐ | `da67_f_one_two_apart` | One Two Apart | full program | ★★☆ | DP over last two values |
| ☐ | `da66_f2_new_game_plus` | New Game Plus | full program | ★★★ | DP (row, col, last door) |
| ☐ | `da67_f_travelling_tourist` | Travelling Tourist | full program | ★★★ | k Dijkstras + bitmask/permutations |

### Lesson 16: Graphs: BFS/DFS ([16-graphs-bfs-dfs.md](16-graphs-bfs-dfs.md)), 13 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a60a_q3_component` | Component Count | full program | ★☆☆ | DFS/BFS/DSU |
| ☐ | `a65_q0_degrees` | Degrees | full program | ★☆☆ | row sums + counting, fast I/O |
| ☐ | `d57_q1_dense` | Dense Graph | class file | ★☆☆ | adjacency matrix class + transpose |
| ☐ | `da68_f_k_connected_city` | K Connected City | full program | ★☆☆ | first K vertices of BFS |
| ☐ | `a59_q3_cycle` | Cycle in a Tree (unicyclic) | full program | ★★☆ | peel degree-1 vertices |
| ☐ | `a62_q2a_line_graph` | Count Path Graphs | full program | ★★☆ | per component: E=V-1, max deg<=2 |
| ☐ | `a62_q2a_pandemic` | Pandemic | full program | ★★☆ | multi-source grid BFS, dist<=T |
| ☐ | `d57_q1_sparse` | Sparse Graph | class file | ★★☆ | vector<set<int>> class + transpose |
| ☐ | `da67_f_border_extend` | Border Extend | full program | ★★☆ | multi-source BFS from land |
| ☐ | `ex05m1_cycle` | Detecting a Cycle | full program | ★★☆ | DFS with parent / DSU, T tests |
| ☐ | `ex05m2_connection` | Connection | full program | ★★☆ | BFS with depth limit from every vertex |
| ☐ | `da66_f1_sea_bridge` | Sea Bridge | full program | ★★★ | multi-source BFS, huge grid memory |
| ☐ | `da66_f2_grid_loop` | Grid Loop | full program | ★★★ | mutual tile links, walk components |

### Lesson 17: Shortest paths ([17-shortest-paths.md](17-shortest-paths.md)), 7 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a58_q3_p3a_hacking` | Hacking | full program | ★★☆ | multi-source vertex-weighted Dijkstra, print max |
| ☐ | `a61_q2_farthest` | Farthest City | full program | ★★☆ | dense Dijkstra, max or -1 |
| ☐ | `da66_f1_buffet_flight` | Buffet Flight | full program | ★★☆ | Dijkstra, w = co[a] + ci[b] |
| ☐ | `ex06e2_shortest` | Shortest Path with Negative Edge | full program | ★★☆ | Bellman-Ford + negative cycle |
| ☐ | `ex06e3_columbia` | Columbia | full program | ★★☆ | Dijkstra on grid, vertex fees |
| ☐ | `a65_q3a_expressway` | Expressway | full program | ★★★ | incremental Floyd per new vertex |
| ☐ | `ex06m2_exchange` | Exchange | full program | ★★★ | negative cycle on -log R |

### Lesson 18: MST & DSU ([18-mst-dsu.md](18-mst-dsu.md)), 3 problems

| ✓ | Problem | Title | Type | Difficulty | Key idea |
|---|---|---|---|---|---|
| ☐ | `a60a_q3_xor_road` | Beautiful Roads (XOR) | full program | ★★☆ | maximum spanning tree, Prim O(n^2) |
| ☐ | `da68_f_internet_provider` | Internet Provider | full program | ★★☆ | Kruskal, drop K-1 heaviest edges |
| ☐ | `ex06e1_cable` | Cable Company | full program | ★★☆ | Prim O(N^2), triangular input |

## Part B: Alphabetical index

| Problem | Title | Lesson | Difficulty |
|---|---|---|---|
| `a58_m_p4` | Class Selection | [13](13-greedy.md) | ★☆☆ |
| `a58_q3_p3a_hacking` | Hacking | [17](17-shortest-paths.md) | ★★☆ |
| `a59_q3_cycle` | Cycle in a Tree (unicyclic) | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `a60_q1_matmod` | Matrix Modulo | [12](12-divide-and-conquer.md) | ★★☆ |
| `a60a_q3_component` | Component Count | [16](16-graphs-bfs-dfs.md) | ★☆☆ |
| `a60a_q3_xor_road` | Beautiful Roads (XOR) | [18](18-mst-dsu.md) | ★★☆ |
| `a60b_mid_p1_buffet` | Buffet Line | [13](13-greedy.md) | ★★☆ |
| `a60b_q1_diagsum` | Diagonal Sum | [10](10-sweep-two-pointers-kadane.md) | ★★☆ |
| `a61_q2_farthest` | Farthest City | [17](17-shortest-paths.md) | ★★☆ |
| `a62_q1a_recur` | Recur Matrix | [12](12-divide-and-conquer.md) | ★★☆ |
| `a62_q1b_chocolate` | Chocolate | [14](14-dp-basics.md) | ★★☆ |
| `a62_q1b_virus` | Virus Check | [12](12-divide-and-conquer.md) | ★★☆ |
| `a62_q2a_line_graph` | Count Path Graphs | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `a62_q2a_pandemic` | Pandemic | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `a63_q1b_virus2` | Virus 2 | [12](12-divide-and-conquer.md) | ★★☆ |
| `a64_q1_lawn_mowing` | Lawn Mowing | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `a64_q1_permu_before` | Permutation with Constraint | [11](11-recursion-backtracking.md) | ★★☆ |
| `a64_q2_table_no_11` | Table no 11 | [15](15-dp-states.md) | ★★☆ |
| `a64_q4_path_sum` | Path Sum | [11](11-recursion-backtracking.md) | ★★★ |
| `a65_q0_degrees` | Degrees | [16](16-graphs-bfs-dfs.md) | ★☆☆ |
| `a65_q1_tower_defense` | Tower Defense | [11](11-recursion-backtracking.md) | ★★★ |
| `a65_q2a_huge_array` | Huge Array | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `a65_q3a_expressway` | Expressway | [17](17-shortest-paths.md) | ★★★ |
| `a66_q2a_insertion_count` | Insertion Sort Count | [09](09-sorting-hashing-counting.md) | ★★☆ |
| `d57_q1_dense` | Dense Graph | [16](16-graphs-bfs-dfs.md) | ★☆☆ |
| `d57_q1_sparse` | Sparse Graph | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `d57_q3_shift` | List Shift | [05](05-cp-list.md) | ★★☆ |
| `d57_q3_zuma` | Zuma | [10](10-sweep-two-pointers-kadane.md) | ★★★ |
| `d58_q1_erase_many` | Erase Many from Vector | [03](03-cp-vector.md) | ★★☆ |
| `d58_q2_custom` | Custom Order | [06](06-heap-priority-queue.md) | ★★☆ |
| `d58_q3_list_replace` | List Replace | [05](05-cp-list.md) | ★★☆ |
| `d58_q3_unary` | Count Unary Node | [07](07-trees-bst.md) | ★☆☆ |
| `d59_q1_range_insert` | Range Insert | [03](03-cp-vector.md) | ★★★ |
| `d59_q3_bst_split` | BST Split | [07](07-trees-bst.md) | ★★★ |
| `d60_q1_qat` | Queue At | [04](04-cp-stack-queue.md) | ★☆☆ |
| `d60_q1_v_uniq` | Vector Unique | [03](03-cp-vector.md) | ★★☆ |
| `d60_q3_same_tree` | Same Tree | [07](07-trees-bst.md) | ★☆☆ |
| `d61_q1_ordered_set` | Union/Intersection of Ordered Set | [09](09-sorting-hashing-counting.md) | ★★☆ |
| `d61_q2_imbalance` | Imbalance | [07](07-trees-bst.md) | ★★☆ |
| `d61_q2_splitlist` | Split List | [05](05-cp-list.md) | ★★☆ |
| `d62_q1a_vote` | Election Winner | [09](09-sorting-hashing-counting.md) | ★☆☆ |
| `d62_q1b_grandfather` | Grandfather | [09](09-sorting-hashing-counting.md) | ★★☆ |
| `d62_q2b_stack_deep_push` | Stack Deep Push | [04](04-cp-stack-queue.md) | ★☆☆ |
| `d62_q2b_vector_insert_many` | Insert Many to Vector | [03](03-cp-vector.md) | ★★★ |
| `d62_q3a_heap_descendant` | Heap Descendant | [06](06-heap-priority-queue.md) | ★★☆ |
| `d62_q3b_queue_m2f` | Queue Move To Front | [04](04-cp-stack-queue.md) | ★★☆ |
| `d63_q1a_hiatus` | Hiatus | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `d63_q1a_multi_insert` | Vector Multiple Add | [02](02-stl.md) | ★☆☆ |
| `d63_q1b_interval_count` | Interval Count | [08](08-binary-search-prefix-sums.md) | ★☆☆ |
| `d63_q2a_pair_gte` | Pair GTE | [03](03-cp-vector.md) | ★☆☆ |
| `d63_q2b_vector_compress` | Vector Compress | [03](03-cp-vector.md) | ★☆☆ |
| `d63_q3a_queue_m2b` | Queue Move To Back | [04](04-cp-stack-queue.md) | ★★☆ |
| `d63_q3a_rank_in_heap` | Rank in Heap | [06](06-heap-priority-queue.md) | ★☆☆ |
| `d63_q4a_leaves_count` | Leaves Count | [07](07-trees-bst.md) | ★☆☆ |
| `d64_q2a_vector_block_swap` | Vector Block Swap | [03](03-cp-vector.md) | ★★☆ |
| `d64_q3a_heap_kth` | Heap K-th | [06](06-heap-priority-queue.md) | ★★☆ |
| `d64_q3b_queue_reverse` | Queue Reverse | [04](04-cp-stack-queue.md) | ★★☆ |
| `d64_q4a_list_merge` | List Merge | [05](05-cp-list.md) | ★★☆ |
| `d64_q4a_subtree` | Subtree Extract | [07](07-trees-bst.md) | ★★☆ |
| `d65_q1c_ice_cream` | Saving for Ice Cream | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `d65_q2a_mitosis` | Stack Mitosis | [04](04-cp-stack-queue.md) | ★★☆ |
| `d65_q3b_queue_total_reverse` | Queue Total Reverse | [04](04-cp-stack-queue.md) | ★★★ |
| `da66_f1_buffet_flight` | Buffet Flight | [17](17-shortest-paths.md) | ★★☆ |
| `da66_f1_linear_recurrence` | Linear Recurrence | [14](14-dp-basics.md) | ★☆☆ |
| `da66_f1_map_walk` | Map Walk | [11](11-recursion-backtracking.md) | ★★☆ |
| `da66_f1_sea_bridge` | Sea Bridge | [16](16-graphs-bfs-dfs.md) | ★★★ |
| `da66_f2_grid_loop` | Grid Loop | [16](16-graphs-bfs-dfs.md) | ★★★ |
| `da66_f2_new_game_plus` | New Game Plus | [15](15-dp-states.md) | ★★★ |
| `da66_m1_heap_before_node` | Heap Before Node | [06](06-heap-priority-queue.md) | ★★☆ |
| `da66_m1_line_monopoly` | Line Monopoly | [10](10-sweep-two-pointers-kadane.md) | ★★★ |
| `da66_m1_queue_remove_many` | Queue Remove Many | [04](04-cp-stack-queue.md) | ★★☆ |
| `da66_m1_tree_leaves_depth` | Tree Leaves Depth | [07](07-trees-bst.md) | ★★☆ |
| `da66_m2_change_data` | Change Data | [02](02-stl.md) | ★★★ |
| `da66_m2_furthest_distance` | Furthest Distance | [07](07-trees-bst.md) | ★★☆ |
| `da67_f_abc_permutation` | ABC Permutation | [11](11-recursion-backtracking.md) | ★★☆ |
| `da67_f_border_extend` | Border Extend | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `da67_f_one_two_apart` | One Two Apart | [15](15-dp-states.md) | ★★☆ |
| `da67_f_travelling_tourist` | Travelling Tourist | [15](15-dp-states.md) | ★★★ |
| `da67_m2_bst_parity_score` | BST Parity Score | [07](07-trees-bst.md) | ★★☆ |
| `da67_m2_dungeon` | Welcome to the Dungeon | [13](13-greedy.md) | ★★☆ |
| `da67_m2_list_zigzag` | List Zigzag | [05](05-cp-list.md) | ★★☆ |
| `da67_m2_queue_insert_shuffle` | Queue Insert Shuffle | [04](04-cp-stack-queue.md) | ★★☆ |
| `da67_m_bst_lca` | BST Lowest Common Ancestor | [07](07-trees-bst.md) | ★★☆ |
| `da67_m_chocolate_truffle` | Chocolate Truffle | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `da67_m_count_distinct` | Vector Count Distinct | [03](03-cp-vector.md) | ★☆☆ |
| `da67_m_queue_block_insert` | Queue Block Insert | [04](04-cp-stack-queue.md) | ★★☆ |
| `da68_f2_sackknap` | SackKnap | [14](14-dp-basics.md) | ★★☆ |
| `da68_f2_zero_one_subset_sum` | 0-1 Subset Sum | [14](14-dp-basics.md) | ★★☆ |
| `da68_f_abcd_permutation` | ABCD Permutation | [11](11-recursion-backtracking.md) | ★★☆ |
| `da68_f_game_of_trades` | Game of Trade | [13](13-greedy.md) | ★★★ |
| `da68_f_hidden_palindrome` | Hidden Palindrome | [14](14-dp-basics.md) | ★★☆ |
| `da68_f_internet_provider` | Internet Provider | [18](18-mst-dsu.md) | ★★☆ |
| `da68_f_k_connected_city` | K Connected City | [16](16-graphs-bfs-dfs.md) | ★☆☆ |
| `da68_m2_interesting_events` | Interesting Events | [10](10-sweep-two-pointers-kadane.md) | ★★☆ |
| `da68_m2_ordered_heap_reconstruction` | Ordered Heap Reconstruction | [06](06-heap-priority-queue.md) | ★★★ |
| `da68_m2_vector_range_aggregate` | Vector Range Aggregate | [03](03-cp-vector.md) | ★★☆ |
| `da68_m_compressed_vector` | Compressed Vector | [03](03-cp-vector.md) | ★★★ |
| `da68_m_count_value` | Count Value in Map | [08](08-binary-search-prefix-sums.md) | ★☆☆ |
| `da68_m_heap_child_swap` | Heap Child Swap | [06](06-heap-priority-queue.md) | ★★☆ |
| `da68_m_list_wrog_prev` | List Wrong Prev | [05](05-cp-list.md) | ★☆☆ |
| `da68_m_stack_of_stack` | Stack Of Stack | [04](04-cp-stack-queue.md) | ★★☆ |
| `ds00_reverse2` | Reverse Vector 2 | [03](03-cp-vector.md) | ★☆☆ |
| `ds03_heap_erase` | Heap Erase | [06](06-heap-priority-queue.md) | ★★☆ |
| `ds04_best_bst` | Generate Optimal BST | [07](07-trees-bst.md) | ★☆☆ |
| `ds04_playlist` | Playlist Management | [05](05-cp-list.md) | ★★★ |
| `ex00e3` | Check Mapping | [09](09-sorting-hashing-counting.md) | ★☆☆ |
| `ex00e4` | Generate Barcode | [11](11-recursion-backtracking.md) | ★☆☆ |
| `ex00e5` | Consecutive Ones | [11](11-recursion-backtracking.md) | ★☆☆ |
| `ex01e3` | Binary Search Near | [08](08-binary-search-prefix-sums.md) | ★☆☆ |
| `ex01m3` | Restaurant | [08](08-binary-search-prefix-sums.md) | ★★☆ |
| `ex02e1_fibo` | Fibonacci | [14](14-dp-basics.md) | ★☆☆ |
| `ex02e2_cnk` | Binomial Coefficient | [14](14-dp-basics.md) | ★☆☆ |
| `ex02e3_bs` | Binary Search Near Repeat | [08](08-binary-search-prefix-sums.md) | ★☆☆ |
| `ex02m1_triangle` | Number Triangle | [14](14-dp-basics.md) | ★☆☆ |
| `ex03e1_lcs` | Longest Common Subsequence | [14](14-dp-basics.md) | ★★☆ |
| `ex04e1_interval` | Class Selection | [13](13-greedy.md) | ★☆☆ |
| `ex04e2_fknapsack` | Fractional Knapsack | [13](13-greedy.md) | ★☆☆ |
| `ex04m1_sort` | 3 Values Sort | [09](09-sorting-hashing-counting.md) | ★★☆ |
| `ex05m1_cycle` | Detecting a Cycle | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `ex05m2_connection` | Connection | [16](16-graphs-bfs-dfs.md) | ★★☆ |
| `ex06e1_cable` | Cable Company | [18](18-mst-dsu.md) | ★★☆ |
| `ex06e2_shortest` | Shortest Path with Negative Edge | [17](17-shortest-paths.md) | ★★☆ |
| `ex06e3_columbia` | Columbia | [17](17-shortest-paths.md) | ★★☆ |
| `ex06m2_exchange` | Exchange | [17](17-shortest-paths.md) | ★★★ |
| `ex07e1_nqueen` | n-Queen | [11](11-recursion-backtracking.md) | ★★☆ |
| `ex07e2_iss` | Increasing Sequence Sum | [14](14-dp-basics.md) | ★★☆ |
| `ex07e3_coloring` | Graph Coloring | [11](11-recursion-backtracking.md) | ★★★ |

## Part C: Statistics

| Lesson | Problems |
|---|---|
| 02 STL | 2 |
| 03 CP::vector | 11 |
| 04 Stack & queue | 11 |
| 05 CP::list | 7 |
| 06 Heap | 8 |
| 07 Trees & BST | 11 |
| 08 Binary search & prefix sums | 10 |
| 09 Sorting, hashing, counting | 6 |
| 10 Sweep, two pointers, Kadane | 4 |
| 11 Recursion & backtracking | 10 |
| 12 Divide & conquer | 4 |
| 13 Greedy | 6 |
| 14 DP I | 10 |
| 15 DP II (states) | 4 |
| 16 Graphs: BFS/DFS | 13 |
| 17 Shortest paths | 7 |
| 18 MST & DSU | 3 |
| **Total** | **127** |
