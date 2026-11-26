title: Linear Recurrence
title_th: Linear Recurrence (ความสัมพันธ์เวียนเกิดเชิงเส้น)
stars: 1
tech: Dynamic programming over a 1-D table, Modular arithmetic
tech_th: Dynamic programming บนตารางหนึ่งมิติ, เลขคณิตมอดุลาร์
complexity: O(n · k) time · O(n + k) memory
key: R(n) depends on the k values before it, so fill R(k), R(k+1), …, R(n) in increasing order, each as the sum of c_j · R(index − j) taken mod 32717 after every step. With n, k ≤ 1000 that is at most 10^6 multiply-adds.
key_th: R(n) ขึ้นกับ k ค่าก่อนหน้า จึงเติม R(k), R(k+1), …, R(n) ตามลำดับจากน้อยไปมาก แต่ละตัวเป็นผลรวมของ c_j · R(index − j) โดย mod 32717 ทุกก้าว เมื่อ n, k ≤ 1000 ใช้การคูณบวกไม่เกิน 10^6 ครั้ง
tests: all 5 PDF samples, Fibonacci (k = 2, c = 1 1, a = 0 1 → R(10) = 55), n < k (answer a_n), 300 random cases against a Python big-integer evaluation, and k = n = 1000.
tests_th: ตัวอย่างทั้ง 5 ใน PDF ฟีโบนัชชี (k = 2, c = 1 1, a = 0 1 → R(10) = 55) กรณี n < k (คำตอบคือ a_n) สุ่ม 300 ชุดเทียบกับ Python ที่คำนวณด้วยจำนวนเต็มขนาดใหญ่ และ k = n = 1000
==== en
## Technique: bottom-up DP for a recurrence

A recurrence that defines R(n) from earlier values is already a DP: the subproblems are R(0), R(1), …, R(n), and computing them in increasing order guarantees that every value needed is ready. The recursion would recompute values exponentially often (exactly like Fibonacci, which is the case k = 2).

## How it maps onto this problem

### Step 1: table and base cases

`value[index]` = R(index) mod 32717. The first k entries are the given a₀ … a_{k−1}. If n < k, the answer is just `value[n]`, which is why the table has `max(n, k−1) + 1` entries.

### Step 2: the transition

> `value[index] = (c₁·value[index−1] + c₂·value[index−2] + … + c_k·value[index−k]) mod 32717`

{{viz}}

### Step 3: keep the numbers small

The identities in the PDF let us take mod after every multiply-add. Each stored value is < 32717 and each c ≤ 1000, so a product is < 3.3·10⁷; the running sum is reduced every time, so it never exceeds about 3.3·10⁷ and `long long` (even `int`) is safe.

:::warn Traps
- Reduce the starting values a_i as well (they are at most 1000 < 32717 here, but it costs nothing).
- c₁ multiplies R(n−1), the **nearest** value, not the oldest.
- n can be smaller than k.
:::

## Solution

{{code}}

**Complexity.** (n − k + 1) values, k terms each: **O(n · k)** ≤ 10⁶. Memory: **O(n + k)**.

{{tested}}
==== th
## เทคนิค: DP แบบ bottom-up สำหรับสูตรเวียนเกิด

สูตรเวียนเกิดที่นิยาม R(n) จากค่าก่อนหน้าคือ DP อยู่แล้ว: ปัญหาย่อยคือ R(0), R(1), …, R(n) และการคำนวณตามลำดับจากน้อยไปมากรับประกันว่าทุกค่าที่ต้องใช้พร้อมแล้ว ส่วน recursion จะคำนวณค่าเดิมซ้ำเป็นจำนวนเลขชี้กำลัง (เหมือนฟีโบนัชชีพอดี ซึ่งคือกรณี k = 2)

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ตารางและกรณีฐาน

`value[index]` = R(index) mod 32717 k ช่องแรกคือ a₀ … a_{k−1} ที่ให้มา ถ้า n < k คำตอบคือ `value[n]` เลย ตารางจึงมี `max(n, k−1) + 1` ช่อง

### ขั้นที่ 2: การเปลี่ยนสถานะ

> `value[index] = (c₁·value[index−1] + c₂·value[index−2] + … + c_k·value[index−k]) mod 32717`

{{viz}}

### ขั้นที่ 3: ทำให้ตัวเลขเล็ก

สมบัติใน PDF ทำให้ mod หลังการคูณบวกทุกครั้งได้ ทุกค่าที่เก็บ < 32717 และทุก c ≤ 1000 ผลคูณจึง < 3.3·10⁷ ผลรวมถูกลดทุกครั้ง จึงไม่เกินราว 3.3·10⁷ ใช้ `long long` (หรือแม้แต่ `int`) ปลอดภัย

:::warn กับดัก
- ลดค่าเริ่มต้น a_i ด้วย (ในข้อนี้ไม่เกิน 1000 < 32717 แต่ทำไว้ก็ไม่เสียอะไร)
- c₁ คูณกับ R(n−1) ซึ่งเป็นค่าที่ **ใกล้ที่สุด** ไม่ใช่ค่าที่เก่าที่สุด
- n อาจน้อยกว่า k
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** (n − k + 1) ค่า ค่าละ k พจน์: **O(n · k)** ≤ 10⁶ หน่วยความจำ: **O(n + k)**

{{tested}}
