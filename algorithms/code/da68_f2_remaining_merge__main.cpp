#include <iostream>
#include <vector>
using namespace std;

vector<int> values, buffer;
long long leftoverAppends;          // runs of lines 11 and 14 (global: starts at 0)

// merge values[left..middle] and values[middle+1..right] exactly like the pseudocode
void merge(int left, int middle, int right) {
    int read1 = left, read2 = middle + 1, write = left;
    // main loop (lines 3-9): both halves still have elements, take the smaller front
    while (read1 <= middle && read2 <= right) {
        if (values[read1] <= values[read2]) buffer[write++] = values[read1++];
        else buffer[write++] = values[read2++];
    }
    // lines 10-12: the left half still has elements, each append is one run of line 11
    while (read1 <= middle) { buffer[write++] = values[read1++]; leftoverAppends++; }
    // lines 13-15: the right half still has elements, each append is one run of line 14
    while (read2 <= right) { buffer[write++] = values[read2++]; leftoverAppends++; }
    // index = left..right: line 16, copy the merged run back
    for (int index = left; index <= right; index++) values[index] = buffer[index];
}

void mergeSort(int left, int right) {
    if (left >= right) return;
    int middle = (left + right) / 2;
    mergeSort(left, middle);
    mergeSort(middle + 1, right);
    merge(left, middle, right);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    values.resize(n);
    buffer.resize(n);
    // index = 0..n-1: read the array
    for (int index = 0; index < n; index++) cin >> values[index];
    mergeSort(0, n - 1);
    cout << leftoverAppends << '\n';
}
