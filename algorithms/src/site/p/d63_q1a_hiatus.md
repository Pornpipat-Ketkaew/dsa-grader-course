title: Hiatus
title_th: Hiatus (ตอนล่าสุดก่อนเดือนที่ถาม)
stars: 1
tech: Encode a pair as one ordered number (year·12 + month), Predecessor search with upper_bound
tech_th: เข้ารหัสคู่เป็นตัวเลขเดียวที่เรียงลำดับได้ (year·12 + month), หาตัวก่อนหน้าด้วย upper_bound
complexity: O((n + m) log n) time · O(n) memory
key: Turn (year, month) into the single number year·12 + (month − 1), which orders months in time. Sort the published months; for a query, upper_bound gives the first published month after it, and the cell just before is the latest month ≤ the query: equal means 0 0, none means −1 −1.
key_th: เปลี่ยน (ปี, เดือน) เป็นตัวเลขเดียว year·12 + (month − 1) ซึ่งเรียงเดือนตามเวลา เรียงเดือนที่ตีพิมพ์ แล้วสำหรับแต่ละคำถาม upper_bound ให้เดือนที่ตีพิมพ์ตัวแรกที่หลังเดือนนั้น ช่องก่อนหน้าคือเดือนล่าสุดที่ ≤ คำถาม: ถ้าเท่ากันตอบ 0 0 ถ้าไม่มีตอบ −1 −1
tests: both PDF samples, 300 random cases (shuffled input) against a direct search, and n = m = 200 000 with years up to 10⁶ in 0.05 s.
tests_th: ตัวอย่างทั้งสองใน PDF สุ่ม 300 ชุด (ข้อมูลสลับลำดับ) เทียบกับการค้นหาตรง ๆ และ n = m = 200 000 ที่ปีถึง 10⁶ ใช้ 0.05 วินาที
==== en
## Technique: predecessor search on an encoded key

Two small skills combine here.

**Encode a pair as one number.** Comparing (year, month) pairs means "compare years, then months". If months have a fixed range (12), the number `year · 12 + (month − 1)` compares exactly the same way, and it fits in an `int` (12·10⁶). Then every sorted-array tool works on it directly.

**Predecessor search.** "The latest element ≤ q" is the last index of the "≤ q" part. With the library, `upper_bound(q)` returns the first element **> q**; the element just before it (if any) is the predecessor.

## How it maps onto this problem

### Step 1: encode and sort

Read each published (year, month), store `year * 12 + (month - 1)`, sort. The input order is not guaranteed, so sorting is needed.

### Step 2: three outcomes per query

`after = upper_bound(published, asked)`:

| situation | output |
|---|---|
| after is the first element | nothing published up to then: `-1 -1` |
| element before after == asked | published that month: `0 0` |
| otherwise | decode the element before after: `latest / 12`, `latest % 12 + 1` |

```diagram
published: 2019/10  2020/1  2020/8        ask 2020/11
           24237    24240   24247         asked = 24250
                                   ↑ after = end → before it: 24247 = 2020/8
```

{{viz}}

### Step 3: output

One line, 2·m numbers. Build a string and print once.

:::warn Traps
- Using year·100 + month works for ordering, but year·12 + (month − 1) also makes consecutive months consecutive numbers; either is fine, but do not use year + month.
- Decoding with month = latest % 12 (forgetting the + 1).
- Printing 0 0 only for an exact match: −1 −1 must also be checked first.
:::

## Solution

{{code}}

**Complexity.** **O((n + m) log n)**. Memory: **O(n)**.

{{tested}}
==== th
## เทคนิค: หาตัวก่อนหน้าบนคีย์ที่เข้ารหัสแล้ว

ข้อนี้รวมทักษะเล็ก ๆ สองอย่าง

**เข้ารหัสคู่เป็นตัวเลขเดียว** การเทียบคู่ (ปี, เดือน) คือ "เทียบปีก่อน แล้วค่อยเทียบเดือน" ถ้าเดือนมีช่วงคงที่ (12) ตัวเลข `year · 12 + (month − 1)` เทียบได้แบบเดียวกันทุกประการ และพอดีกับ `int` (12·10⁶) จากนั้นเครื่องมือของอาร์เรย์ที่เรียงแล้วใช้กับมันได้ทันที

**หาตัวก่อนหน้า (predecessor)** "สมาชิกล่าสุดที่ ≤ q" คือดัชนีสุดท้ายของส่วน "≤ q" ด้วยไลบรารี `upper_bound(q)` คืนสมาชิกตัวแรกที่ **> q** สมาชิกก่อนหน้ามัน (ถ้ามี) คือตัวก่อนหน้า

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เข้ารหัสและเรียง

อ่าน (ปี, เดือน) ที่ตีพิมพ์แต่ละตัว เก็บ `year * 12 + (month - 1)` แล้วเรียง ลำดับในข้อมูลเข้าไม่รับประกัน จึงต้องเรียง

### ขั้นที่ 2: สามผลลัพธ์ต่อคำถาม

`after = upper_bound(published, asked)`:

| สถานการณ์ | ผลลัพธ์ |
|---|---|
| after เป็นตัวแรกสุด | ไม่มีการตีพิมพ์ก่อนหน้านั้นเลย: `-1 -1` |
| ตัวก่อน after == asked | ตีพิมพ์เดือนนั้นพอดี: `0 0` |
| นอกนั้น | ถอดรหัสตัวก่อน after: `latest / 12`, `latest % 12 + 1` |

```diagram
ตีพิมพ์:  2019/10  2020/1  2020/8        ถาม 2020/11
          24237    24240   24247         asked = 24250
                                  ↑ after = ท้าย → ตัวก่อนหน้า: 24247 = 2020/8
```

{{viz}}

### ขั้นที่ 3: ผลลัพธ์

บรรทัดเดียว 2·m ตัวเลข สร้าง string แล้วพิมพ์ครั้งเดียว

:::warn กับดัก
- ใช้ year·100 + month ก็เรียงได้ถูก แต่ year·12 + (month − 1) ทำให้เดือนที่ติดกันเป็นเลขที่ติดกันด้วย ใช้แบบไหนก็ได้ แต่อย่าใช้ year + month
- ถอดรหัสเดือนเป็น latest % 12 (ลืม + 1)
- ต้องตรวจ −1 −1 ก่อนเทียบว่าเท่ากัน
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** **O((n + m) log n)** หน่วยความจำ: **O(n)**

{{tested}}
