#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    string line;
    getline(cin, line);                    // finish the line that held n

    vector<int> degree(n);
    int maxDegree = 0;
    // row = 0..n-1 (top to bottom): row "row" of the matrix lists the
    // neighbours of node "row", so its degree is the number of 1s on that line.
    // Every cell is a single character, so counting '1' characters is enough:
    // no need to parse 25 000 000 integers one by one.
    for (int row = 0; row < n; row++) {
        // skip a blank line if the file has one (a matrix row always has digits)
        do getline(cin, line); while (line.find_first_of("01") == string::npos);
        degree[row] = count(line.begin(), line.end(), '1');
        maxDegree = max(maxDegree, degree[row]);
    }

    vector<int> nodesWithDegree(maxDegree + 1, 0);
    // node = 0..n-1: drop every node into the bucket of its degree
    for (int node = 0; node < n; node++) nodesWithDegree[degree[node]]++;

    // d = 0..maxDegree (upward): the answer lists the buckets in degree order
    for (int d = 0; d <= maxDegree; d++) cout << nodesWithDegree[d] << (d < maxDegree ? ' ' : '\n');
}
