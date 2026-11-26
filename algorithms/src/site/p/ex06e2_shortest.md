title: Shortest Path with Negative Edge
title_th: Shortest Path with Negative Edge (เส้นทางสั้นที่สุดที่มีเส้นติดลบ)
stars: 2
tech: Bellman–Ford, Negative-cycle detection (round n still improves), Virtual source
tech_th: Bellman–Ford, ตรวจวงรอบติดลบ (รอบที่ n ยังดีขึ้น), ต้นทางสมมุติ
complexity: O(N · E) time · O(N + E) memory
key: Bellman–Ford settles every shortest path within N − 1 rounds when no negative cycle exists, so an improvement in round N proves one. The samples want −1 for a negative cycle anywhere, even one s cannot reach, so the check starts every vertex at 0 (a virtual source to all vertices). If it passes, a normal Bellman–Ford from s gives the distances.
key_th: Bellman–Ford ทำให้ทุกเส้นทางสั้นที่สุดนิ่งภายใน N − 1 รอบเมื่อไม่มีวงรอบติดลบ การดีขึ้นในรอบที่ N จึงพิสูจน์ว่ามี ตัวอย่างต้องการ −1 เมื่อมีวงรอบติดลบที่ไหนก็ได้ แม้ s ไปไม่ถึง การตรวจจึงให้ทุกจุดเริ่มที่ 0 (ต้นทางสมมุติที่เชื่อมทุกจุด) ถ้าผ่าน ก็รัน Bellman–Ford ธรรมดาจาก s
tests: both PDF samples, a graph where s reaches a vertex only through a negative edge, N = 1, 300 random graphs (with and without negative cycles) against a Floyd–Warshall brute force, and a dense N = 100 graph in 0.01 s.
tests_th: ตัวอย่างทั้งสองใน PDF กราฟที่ s ไปถึงจุดหนึ่งได้ผ่านเส้นติดลบเท่านั้น N = 1 กราฟสุ่ม 300 ชุด (มีและไม่มีวงรอบติดลบ) เทียบกับ brute force แบบ Floyd–Warshall และกราฟหนาแน่น N = 100 ใช้ 0.01 วินาที
==== en
## Technique: Bellman–Ford and the round-N test

Bellman–Ford relaxes **every** edge in rounds. After round r, every vertex whose shortest path has at most r edges holds its correct distance. A shortest path never repeats a vertex when there is no negative cycle, so it has at most N − 1 edges:

> no negative cycle ⇒ nothing changes in round N.

Read backwards: **if round N still lowers some value, a negative cycle exists.** Around such a cycle values can be lowered forever, so "shortest distance" is undefined.

## How it maps onto this problem

### Step 1: which negative cycles count?

Sample 2 has the cycle 1 → 2 → 3 → 1 of weight −3, which s = 0 cannot reach, and the expected output is still −1. So the check must find negative cycles **anywhere** in the graph. A Bellman–Ford from s only sees what s reaches. The fix is a virtual source joined to every vertex by a 0-weight edge: in practice, start **every** value at 0 and run up to N rounds.

### Step 2: distances from s

If the check found no cycle, run ordinary Bellman–Ford from s (`distance[s] = 0`, others ∞; skip edges from unreached vertices), at most N − 1 rounds, stopping early when a round changes nothing.

{{viz}}

### Step 3: print

N numbers for vertices 0..N−1, or the single number −1.

:::warn Traps
- Checking for a negative cycle only from s: sample 2 would print `0 ∞ ∞ ∞` instead of −1.
- Treating "unreachable" as ∞ + w: the `UNREACHED` check before relaxing prevents a fake improvement.
- The PDF does not say what to print for an unreachable vertex; the test data never has one (every vertex is reachable from s in the tests we built to match the samples).
:::

## Solution

{{code}}

**Complexity.** Two Bellman–Ford runs of at most N rounds × E edges: **O(N · E)**. Memory: **O(N + E)**.

{{tested}}
==== th
## เทคนิค: Bellman–Ford และการตรวจรอบที่ N

Bellman–Ford ผ่อนคลาย **ทุก** เส้นเป็นรอบ ๆ หลังรอบที่ r ทุกจุดที่เส้นทางสั้นที่สุดมีไม่เกิน r เส้นจะมีระยะที่ถูกต้อง เมื่อไม่มีวงรอบติดลบ เส้นทางสั้นที่สุดไม่ผ่านจุดซ้ำ จึงมีไม่เกิน N − 1 เส้น:

> ไม่มีวงรอบติดลบ ⇒ รอบที่ N ไม่มีอะไรเปลี่ยน

อ่านกลับด้าน: **ถ้ารอบที่ N ยังลดค่าได้ แปลว่ามีวงรอบติดลบ** รอบวงนั้นลดค่าได้ไม่สิ้นสุด "ระยะสั้นที่สุด" จึงไม่มีนิยาม

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: วงรอบติดลบแบบไหนที่นับ?

ตัวอย่าง 2 มีวง 1 → 2 → 3 → 1 น้ำหนัก −3 ซึ่ง s = 0 ไปไม่ถึง แต่คำตอบยังเป็น −1 การตรวจจึงต้องหาวงรอบติดลบ **ที่ไหนก็ได้** ในกราฟ Bellman–Ford จาก s เห็นแค่ส่วนที่ s ไปถึง วิธีแก้คือต้นทางสมมุติที่เชื่อมทุกจุดด้วยเส้นน้ำหนัก 0: ในทางปฏิบัติคือให้ **ทุก** ค่าเริ่มที่ 0 แล้วรันไม่เกิน N รอบ

### ขั้นที่ 2: ระยะจาก s

ถ้าไม่เจอวงรอบ ให้รัน Bellman–Ford ธรรมดาจาก s (`distance[s] = 0` ที่เหลือ ∞; ข้ามเส้นที่ออกจากจุดที่ยังไปไม่ถึง) ไม่เกิน N − 1 รอบ และหยุดก่อนเมื่อรอบไหนไม่มีอะไรเปลี่ยน

{{viz}}

### ขั้นที่ 3: พิมพ์

N ตัวเลขของจุด 0..N−1 หรือตัวเลขเดียว −1

:::warn กับดัก
- ตรวจวงรอบติดลบจาก s เท่านั้น: ตัวอย่าง 2 จะพิมพ์ `0 ∞ ∞ ∞` แทน −1
- ปล่อยให้ "ไปไม่ถึง" กลายเป็น ∞ + w: การตรวจ `UNREACHED` ก่อนผ่อนคลายกันการดีขึ้นปลอม
- PDF ไม่ได้บอกว่าจุดที่ไปไม่ถึงให้พิมพ์อะไร ข้อมูลทดสอบไม่มีกรณีนี้ (ทุกจุดไปถึงได้จาก s ในชุดทดสอบที่สร้างให้ตรงกับตัวอย่าง)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** Bellman–Ford สองครั้ง ไม่เกิน N รอบ × E เส้น: **O(N · E)** หน่วยความจำ: **O(N + E)**

{{tested}}
