#include <iostream>
#include <string>
using namespace std;

const int LETTERS = 3;                // A, B, C
int length;
int remaining[LETTERS];              // remaining[c] = how many more copies of letter 'A'+c may be used
string word;                         // the string being built
string output;                       // all answers; the count must be printed before them
long long answerCount = 0;

// position = how many letters are already placed (word[0..position-1])
void generate(int position) {
    if (position == length) {
        output += word;
        output += '\n';
        answerCount++;
        return;
    }
    // letter = 0, 1, ..., LETTERS-1 (alphabetical): answers appear in dictionary order
    for (int letter = 0; letter < LETTERS; letter++) {
        if (remaining[letter] == 0) continue;    // this letter is used up
        remaining[letter]--;                     // choose
        word[position] = char('A' + letter);
        generate(position + 1);                  // explore
        remaining[letter]++;                     // un-choose (backtrack)
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> length >> remaining[0] >> remaining[1] >> remaining[2];
    word.assign(length, ' ');
    generate(0);
    cout << answerCount << '\n' << output;
}
