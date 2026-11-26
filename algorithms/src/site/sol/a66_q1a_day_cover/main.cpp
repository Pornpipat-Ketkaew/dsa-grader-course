#include <iostream>
#include <bitset>
using namespace std;

const int MAX_DAYS = 1000;
int dayCount, studentCount;
int bestCount;                          // fewest students found so far that cover every day
bitset<MAX_DAYS> freeDays[20];          // freeDays[student] bit day-1 = student is free on that day
bitset<MAX_DAYS> allDays;               // bits 0..dayCount-1 set: "every day is covered"

// Decide for students student, student+1, ..., studentCount-1 whether to invite them.
// invited = students invited so far, covered = the days they cover together.
void choose(int student, int invited, const bitset<MAX_DAYS> &covered) {
    if (invited >= bestCount) return;                  // bound: cannot beat the best answer
    if (covered == allDays) { bestCount = invited; return; }   // done: more students never help
    if (student == studentCount) return;               // nobody left and some day is still empty
    choose(student + 1, invited + 1, covered | freeDays[student]);   // invite this student
    choose(student + 1, invited, covered);                           // skip this student
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cin >> dayCount >> studentCount;
    // student = 0..studentCount-1 (in input order): read k, then k free days (1-based)
    for (int student = 0; student < studentCount; student++) {
        int k;
        cin >> k;
        // index = 0..k-1: read one free day and switch on its bit
        for (int index = 0; index < k; index++) {
            int day;
            cin >> day;
            freeDays[student][day - 1] = 1;
        }
    }
    // day = 0..dayCount-1: the target has every real day switched on
    for (int day = 0; day < dayCount; day++) allDays[day] = 1;
    bestCount = studentCount + 1;                      // worse than any real answer
    choose(0, 0, bitset<MAX_DAYS>());
    cout << bestCount << '\n';
}
