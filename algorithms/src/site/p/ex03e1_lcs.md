title: Longest Common Subsequence
title_th: ลำดับย่อยร่วมที่ยาวที่สุด (LCS)
stars: 2
tech: Dynamic programming on two prefixes (2-D table), Case split on the last letters
tech_th: Dynamic programming บน prefix สองตัว (ตารางสองมิติ), แบ่งกรณีตามตัวอักษรตัวสุดท้าย
complexity: O(n · m) time and memory (≤ 501 × 501)
key: Let lcs[i][j] be the answer for the first i letters of A and the first j letters of B. If their last letters match, use them: lcs[i−1][j−1] + 1. Otherwise one of the two last letters is not in the LCS: max(lcs[i−1][j], lcs[i][j−1]).
key_th: ให้ lcs[i][j] เป็นคำตอบของ i ตัวแรกของ A และ j ตัวแรกของ B ถ้าตัวสุดท้ายตรงกันให้ใช้มัน: lcs[i−1][j−1] + 1 ไม่อย่างนั้นตัวสุดท้ายตัวใดตัวหนึ่งไม่อยู่ใน LCS: max(lcs[i−1][j], lcs[i][j−1])
tests: both PDF samples, one-letter strings, 300 random pairs against a brute force over subsequences, and two 500-letter strings.
tests_th: ตัวอย่างทั้งสองใน PDF สตริงตัวอักษรเดียว สุ่ม 300 คู่เทียบกับ brute force บน subsequence และสตริงยาว 500 ตัวสองตัว
==== en
## Technique: DP over pairs of prefixes

For problems on two sequences, the standard state is a pair of **prefix lengths** `(i, j)`. Looking at the last element of each prefix gives a small case split, and each case reduces to a shorter pair of prefixes. That is the whole recipe for LCS, edit distance and many string DPs.

## How it maps onto this problem

### Step 1: the state

> `lcs[i][j]` = length of an LCS of `A[0..i−1]` and `B[0..j−1]`; `lcs[0][j] = lcs[i][0] = 0`.

### Step 2: the case split

Look at the last letters `A[i−1]` and `B[j−1]`:

- **equal**: some LCS ends with this letter matched in both, so `lcs[i][j] = lcs[i−1][j−1] + 1`.
- **different**: they cannot both be the last letter of a common subsequence, so at least one of them is unused. Drop it: `lcs[i][j] = max(lcs[i−1][j], lcs[i][j−1])`.

{{viz}}

### Step 3: order

`lcs[i][j]` reads the cell above, to the left, and diagonally up-left. Filling rows top to bottom and each row left to right meets all three dependencies.

:::proof Why "equal → use it" is safe
Take any LCS Z of the two prefixes. If Z does not end with the matched pair, either its last letter matches something earlier, and we can re-match it to A[i−1] and B[j−1] (they are equal), or the pair is unused and appending it makes Z longer. Either way an LCS using the pair exists.
:::

## Solution

{{code}}

**Complexity.** (n + 1)(m + 1) cells, O(1) each: **O(n · m)** ≤ 2.5·10⁵. Memory: the table, **O(n · m)** (two rows would suffice since only the length is asked).

{{tested}}
==== th
## เทคนิค: DP บนคู่ของ prefix

สำหรับโจทย์บนลำดับสองตัว สถานะมาตรฐานคือคู่ของ **ความยาว prefix** `(i, j)` การดูตัวสุดท้ายของแต่ละ prefix ให้การแบ่งกรณีเล็ก ๆ และแต่ละกรณีลดลงเป็นคู่ prefix ที่สั้นกว่า นี่คือสูตรทั้งหมดของ LCS, edit distance และ DP บนสตริงอีกมาก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะ

> `lcs[i][j]` = ความยาว LCS ของ `A[0..i−1]` และ `B[0..j−1]` โดย `lcs[0][j] = lcs[i][0] = 0`

### ขั้นที่ 2: แบ่งกรณี

ดูตัวอักษรสุดท้าย `A[i−1]` และ `B[j−1]`:

- **เท่ากัน**: มี LCS ที่จบด้วยตัวนี้โดยจับคู่ทั้งสองข้าง ดังนั้น `lcs[i][j] = lcs[i−1][j−1] + 1`
- **ต่างกัน**: ทั้งคู่เป็นตัวสุดท้ายของ subsequence ร่วมพร้อมกันไม่ได้ อย่างน้อยหนึ่งตัวไม่ถูกใช้ ตัดมันทิ้ง: `lcs[i][j] = max(lcs[i−1][j], lcs[i][j−1])`

{{viz}}

### ขั้นที่ 3: ลำดับ

`lcs[i][j]` อ่านช่องข้างบน ทางซ้าย และทแยงซ้ายบน การเติมแถวจากบนลงล่าง และแต่ละแถวจากซ้ายไปขวาตอบโจทย์การพึ่งพาทั้งสาม

:::proof ทำไม "เท่ากัน → ใช้เลย" ปลอดภัย
นำ LCS Z ใด ๆ ของสอง prefix มา ถ้า Z ไม่ได้จบด้วยคู่ที่ตรงกันนี้ แปลว่าตัวสุดท้ายของมันจับคู่กับตำแหน่งก่อนหน้า ซึ่งย้ายมาจับกับ A[i−1] และ B[j−1] ได้ (เพราะเท่ากัน) หรือคู่นี้ไม่ถูกใช้เลย และการต่อท้ายมันจะทำให้ Z ยาวขึ้น ไม่ว่ากรณีใดก็มี LCS ที่ใช้คู่นี้
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** (n + 1)(m + 1) ช่อง ช่องละ O(1): **O(n · m)** ≤ 2.5·10⁵ หน่วยความจำ: ตาราง **O(n · m)** (ใช้สองแถวก็พอเพราะถามแค่ความยาว)

{{tested}}
