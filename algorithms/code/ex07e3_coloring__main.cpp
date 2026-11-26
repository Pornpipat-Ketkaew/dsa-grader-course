#include <iostream>
using namespace std;

int vertexCount;
bool adjacent[50][50];
int degree[50];
int color[50];                  // 0 = not colored yet, otherwise 1..colorsUsed
int neighborsWithColor[50][51]; // [vertex][c] = colored neighbors of vertex that have color c
int distinctNeighborColors[50]; // how many different colors touch vertex ("saturation")
int bestColors;                 // fewest colors of a complete coloring found so far

void paint(int vertex, int c) {
    color[vertex] = c;
    // other = 0..vertexCount-1: every neighbor now has color c next to it
    for (int other = 0; other < vertexCount; other++)
        if (adjacent[vertex][other] && neighborsWithColor[other][c]++ == 0)
            distinctNeighborColors[other]++;
}

void erase(int vertex) {
    int c = color[vertex];
    color[vertex] = 0;
    // other = 0..vertexCount-1: take color c back from every neighbor
    for (int other = 0; other < vertexCount; other++)
        if (adjacent[vertex][other] && --neighborsWithColor[other][c] == 0)
            distinctNeighborColors[other]--;
}

// colored = vertices colored so far, colorsUsed = colors 1..colorsUsed are in use
void search(int colored, int colorsUsed) {
    if (colorsUsed >= bestColors) return;               // bound: cannot beat the best
    if (colored == vertexCount) { bestColors = colorsUsed; return; }
    // pick the most constrained uncolored vertex: most distinct neighbor colors,
    // ties broken by larger degree (other = 0..vertexCount-1, a linear scan)
    int vertex = -1;
    for (int other = 0; other < vertexCount; other++) {
        if (color[other]) continue;
        if (vertex == -1 || distinctNeighborColors[other] > distinctNeighborColors[vertex] ||
            (distinctNeighborColors[other] == distinctNeighborColors[vertex] && degree[other] > degree[vertex]))
            vertex = other;
    }
    // c = 1..colorsUsed: reuse any existing color that no neighbor has
    for (int c = 1; c <= colorsUsed; c++) {
        if (neighborsWithColor[vertex][c]) continue;
        paint(vertex, c);
        search(colored + 1, colorsUsed);
        erase(vertex);
    }
    // or open one new color: all unused colors are interchangeable, so one try is enough
    paint(vertex, colorsUsed + 1);
    search(colored + 1, colorsUsed + 1);
    erase(vertex);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int edgeCount;
    cin >> vertexCount >> edgeCount;
    // edge = 0..edgeCount-1: read each edge once, skipping self-loops and repeats
    for (int edge = 0; edge < edgeCount; edge++) {
        int a, b;
        cin >> a >> b;
        if (a == b || adjacent[a][b]) continue;
        adjacent[a][b] = adjacent[b][a] = true;
        degree[a]++;
        degree[b]++;
    }
    bestColors = vertexCount + 1;                       // worse than any real coloring
    search(0, 0);
    cout << bestColors << '\n';
}
