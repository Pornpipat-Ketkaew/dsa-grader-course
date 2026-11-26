title: Zuma
title_th: ซูม่า (Zuma)
stars: 3
tech: Two pointers expanding outward, Run-length scanning
tech_th: Two pointers ที่ขยายออกด้านนอก, การไล่ช่วงสีเดียวกัน (run)
complexity: O(N) time · O(N) memory
key: Never insert or erase. Every explosion removes a block that touches the gap, so two pointers left/right that only move outward describe everything; the answer is beads[0..left] + beads[right..n−1].
key_th: ไม่ต้องแทรกหรือลบจริง ทุกการระเบิดลบก้อนที่ติดกับช่องว่าง two pointers ซ้าย/ขวาที่เคลื่อนออกด้านนอกอย่างเดียวจึงบรรยายทุกอย่างได้ คำตอบคือ beads[0..left] + beads[right..n−1]
tests: all 4 PDF samples (one leaves an empty line) and 400 random strings with few colors (long chain reactions) against a simulation that really inserts and erases; N = 10⁶ runs in 0.08 s. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 4 ชุดใน PDF (ชุดหนึ่งเหลือบรรทัดว่าง) และสุ่ม 400 ชุดที่มีสีน้อย (ระเบิดต่อเนื่องยาว) เทียบกับการจำลองที่แทรกและลบจริง กรณี N = 10⁶ ใช้ 0.08 วินาที ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: two pointers that only move outward

A naive simulation inserts the bead, finds runs of ≥ 3, erases them and repeats. With `vector::erase` every explosion is O(N), and a chain of explosions makes it O(N²) on 10⁶ beads.

The key observation is **locality**: every explosion happens **at the gap** where the two sides last met. So the whole process is described by two indices that only move **away** from the insertion point:

- `left`: the last surviving bead on the left side,
- `right`: the first surviving bead on the right side.

Each index moves over a bead at most once, so the total work is O(N): the classic two-pointer argument of Lesson 10.

## How it maps onto this problem

### Step 1: the first explosion (around the shot)

The shot of color V lands between `beads[insertAt−1]` and `beads[insertAt]`. Walk `left` from `insertAt−1` to the left over beads of color V, and `right` from `insertAt` to the right over beads of color V. The run has

`runLength = (insertAt − 1 − left) + (right − insertAt) + 1` (the +1 is the shot).

- `runLength < 3` → nothing explodes; print the original beads with V inserted. (Sample 2: `1 4 1 1 1 1`: the four 1s on the right do **not** explode, because only shots and collisions trigger explosions.)
- otherwise the run disappears, and the beads at `left` and `right` are now neighbours.

### Step 2: chain reactions at the meeting point

```diagram
beads   1 3 1 4 4 [shot 4] 1 1 5 5 5           insertAt = 5
             left┘          └right
run of 4s: 4 4 + shot = 3  → explode      survivors: 1 3 1 | 1 1 5 5 5
meeting colors: beads[left] = 1, beads[right] = 1  → same color
run of 1s around the gap: 1 (left) + 2 (right) = 3  → explode
survivors: 1 3 | 5 5 5
meeting colors: 3 vs 5 → different → stop        answer 1 3 5 5 5
```

Loop while `beads[left] == beads[right]`: extend `newLeft` to the left and `newRight` to the right over that color. If the two pieces together have **≥ 3** beads, they explode (`left = newLeft`, `right = newRight`) and we look at the new meeting pair; otherwise stop. Note that 2 beads of the same color meeting do **not** explode.

:::key Why survivors are always one prefix + one suffix
Explosions only ever remove a contiguous block containing the gap. So the beads that disappear form one contiguous range `(left, right)` of the original array, and the survivors are `beads[0..left]` followed by `beads[right..n−1]`. No erasing is needed: just print those two ranges.
:::

{{viz}}

:::warn Traps
- Existing runs of ≥ 3 do not explode by themselves (sample 2, and the `5 5 5` in sample 4).
- Two equal beads meeting (only 2 in total) do not explode.
- Everything can disappear: sample 3 prints an empty line.
- `insertAt` can be 0 (left side empty) or N (right side empty): the `left >= 0` and `right < n` guards cover both.
:::

## Solution

{{code}}

**Complexity.** `left` only decreases and `right` only increases, each over at most N beads, and printing is O(N): **O(N)** time. Memory: the beads, **O(N)**.

{{tested}}
==== th
## เทคนิค: two pointers ที่เคลื่อนออกด้านนอกอย่างเดียว

การจำลองตรง ๆ คือแทรกลูกปัด หา run ที่ยาว ≥ 3 ลบออก แล้วทำซ้ำ ถ้าใช้ `vector::erase` การระเบิดแต่ละครั้งใช้ O(N) และการระเบิดต่อเนื่องทำให้เป็น O(N²) บนลูกปัด 10⁶ เม็ด

ข้อสังเกตสำคัญคือ **ความเฉพาะที่ (locality)**: ทุกการระเบิดเกิด **ที่ช่องว่าง** ที่สองฝั่งมาชนกันครั้งล่าสุด กระบวนการทั้งหมดจึงอธิบายได้ด้วย index สองตัวที่เคลื่อน **ออกห่าง** จากจุดแทรกเท่านั้น:

- `left`: ลูกปัดตัวสุดท้ายที่รอดทางฝั่งซ้าย
- `right`: ลูกปัดตัวแรกที่รอดทางฝั่งขวา

แต่ละ index ผ่านลูกปัดแต่ละเม็ดไม่เกินหนึ่งครั้ง งานรวมจึงเป็น O(N): เหตุผลแบบ two pointers มาตรฐานในบทที่ 10

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: การระเบิดครั้งแรก (รอบลูกที่ยิง)

ลูกที่ยิงสี V ลงระหว่าง `beads[insertAt−1]` กับ `beads[insertAt]` เดิน `left` จาก `insertAt−1` ไปทางซ้ายผ่านลูกสี V และเดิน `right` จาก `insertAt` ไปทางขวาผ่านลูกสี V run นี้ยาว

`runLength = (insertAt − 1 − left) + (right − insertAt) + 1` (+1 คือลูกที่ยิง)

- `runLength < 3` → ไม่มีอะไรระเบิด พิมพ์ลูกปัดเดิมพร้อมแทรก V (ตัวอย่างที่ 2: `1 4 1 1 1 1` เลข 1 สี่เม็ดทางขวา **ไม่** ระเบิด เพราะระเบิดได้จากการยิงหรือการชนเท่านั้น)
- นอกนั้น run นี้หายไป และลูกที่ `left` กับ `right` กลายเป็นเพื่อนบ้านกัน

### ขั้นที่ 2: ระเบิดต่อเนื่องที่จุดชน

```diagram
beads   1 3 1 4 4 [ยิง 4] 1 1 5 5 5           insertAt = 5
             left┘         └right
run ของ 4: 4 4 + ลูกยิง = 3  → ระเบิด      ที่รอด: 1 3 1 | 1 1 5 5 5
สีที่ชนกัน: beads[left] = 1, beads[right] = 1  → สีเดียวกัน
run ของ 1 รอบช่องว่าง: 1 (ซ้าย) + 2 (ขวา) = 3  → ระเบิด
ที่รอด: 1 3 | 5 5 5
สีที่ชนกัน: 3 กับ 5 → ต่างกัน → หยุด        คำตอบ 1 3 5 5 5
```

วนลูปตราบที่ `beads[left] == beads[right]`: ขยาย `newLeft` ไปซ้ายและ `newRight` ไปขวาผ่านสีนั้น ถ้าสองฝั่งรวมกัน **≥ 3** เม็ด ก็ระเบิด (`left = newLeft`, `right = newRight`) แล้วดูคู่ที่ชนกันคู่ใหม่ ไม่อย่างนั้นหยุด สังเกตว่าสีเดียวกันชนกันแค่ 2 เม็ด **ไม่** ระเบิด

:::key ทำไมที่รอดเป็นส่วนหน้าหนึ่งก้อน + ส่วนท้ายหนึ่งก้อนเสมอ
การระเบิดลบเฉพาะก้อนต่อเนื่องที่มีช่องว่างอยู่ข้างในเท่านั้น ลูกปัดที่หายไปจึงเป็นช่วงต่อเนื่อง `(left, right)` ของอาร์เรย์เดิมช่วงเดียว และที่รอดคือ `beads[0..left]` ตามด้วย `beads[right..n−1]` ไม่ต้องลบจริงเลย แค่พิมพ์สองช่วงนี้
:::

{{viz}}

:::warn กับดัก
- run ที่ยาว ≥ 3 อยู่แล้วไม่ระเบิดเอง (ตัวอย่างที่ 2 และ `5 5 5` ในตัวอย่างที่ 4)
- สีเดียวกันชนกัน (รวมแค่ 2 เม็ด) ไม่ระเบิด
- อาจหายหมดทั้งสาย: ตัวอย่างที่ 3 พิมพ์บรรทัดว่าง
- `insertAt` เป็น 0 ได้ (ฝั่งซ้ายว่าง) หรือ N (ฝั่งขวาว่าง) เงื่อนไข `left >= 0` และ `right < n` ครอบคลุมทั้งสองกรณี
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** `left` ลดลงอย่างเดียวและ `right` เพิ่มขึ้นอย่างเดียว แต่ละตัวผ่านไม่เกิน N เม็ด และการพิมพ์เป็น O(N): เวลา **O(N)** หน่วยความจำ: ลูกปัด **O(N)**

{{tested}}
