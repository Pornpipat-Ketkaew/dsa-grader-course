#include <iostream>
#include <string>
using namespace std;

int onesWanted, length;
string barcode;      // the code being built; position p is decided at recursion depth p
string output;       // every answer, printed once at the end

// position = number of characters already decided (barcode[0..position-1])
// onesUsed = how many of them are '1'
void generate(int position, int onesUsed) {
    if (position == length) {            // a full code; the pruning guarantees onesUsed == onesWanted
        output += barcode;
        output += '\n';
        return;
    }
    int placesLeft = length - position;
    int onesLeft = onesWanted - onesUsed;
    // choice '0': allowed only if the remaining placesLeft-1 cells can still hold every needed '1'
    if (onesLeft <= placesLeft - 1) {
        barcode[position] = '0';
        generate(position + 1, onesUsed);
    }
    // choice '1': allowed only if a '1' is still needed
    if (onesLeft > 0) {
        barcode[position] = '1';
        generate(position + 1, onesUsed + 1);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> onesWanted >> length;
    barcode.assign(length, '0');
    generate(0, 0);
    cout << output;
}
