#include <iostream>
#include <vector>

using namespace std;

void multiple_add(vector<int> &v, int value, int position, int count) {
  int n = v.size();                 // old size, before we grow
  v.resize(n + count);              // new slots v[n] .. v[n+count-1] are added at the end

  // Shift the tail right by `count`.
  // i visits n-1, n-2, ..., position (RIGHT to LEFT, real indices).
  // Right to left so we never overwrite an element we have not moved yet.
  for (int i = n - 1; i >= position; i--) {
    v[i + count] = v[i];
  }

  // Fill the gap with value.
  // i visits position, position+1, ..., position+count-1 (left to right): exactly `count` slots.
  for (int i = position; i < position + count; i++) {
    v[i] = value;
  }
}

int main() {
  std::ios_base::sync_with_stdio(false);
  cin.tie(0);

    int n,value,position,count;
    cin >> n >> value >> position >> count;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    multiple_add(v,value,position,count);

    cout << "After call multiple_add" << endl << "Size = " << v.size() << endl;
    for (auto &x : v) cout << x << " ";
    cout << endl;
}
