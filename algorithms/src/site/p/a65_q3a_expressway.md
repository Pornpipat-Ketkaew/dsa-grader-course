title: Expressway
title_th: Expressway (ทางด่วนเพิ่มทุกปี)
stars: 3
tech: Floyd–Warshall, The meaning of each phase (stop-overs ≤ k), Answering incremental queries for free
tech_th: Floyd–Warshall, ความหมายของแต่ละเฟส (จุดแวะ ≤ k), ตอบคำถามแบบเพิ่มทีละขั้นได้ฟรี
complexity: O(n³) time · O(n²) memory
key: After phase k of Floyd–Warshall, cost[a][b] is the cheapest route whose stop-overs are all ≤ k. A 1 → 2 route with stop-overs ≤ k uses only provinces 1..k, which is exactly the network after year k. So run Floyd–Warshall once with k = 1, 2, …, n and print cost[1][2] after each phase k ≥ 3.
key_th: หลังเฟส k ของ Floyd–Warshall cost[a][b] คือเส้นทางที่ถูกที่สุดที่จุดแวะทั้งหมด ≤ k เส้นทาง 1 → 2 ที่จุดแวะ ≤ k ใช้แค่จังหวัด 1..k ซึ่งคือเครือข่ายหลังปีที่ k พอดี จึงรัน Floyd–Warshall ครั้งเดียวด้วย k = 1, 2, …, n แล้วพิมพ์ cost[1][2] หลังแต่ละเฟส k ≥ 3
tests: the PDF sample and n = 3, 300 random inputs against a brute force that runs Dijkstra on each year's network, and n = 700 with every possible road in 0.41 s.
tests_th: ตัวอย่างใน PDF และ n = 3, ข้อมูลสุ่ม 300 ชุดเทียบกับ brute force ที่รัน Dijkstra บนเครือข่ายของแต่ละปี และ n = 700 ที่มีถนนครบทุกเส้น ใช้ 0.41 วินาที
==== en
## Technique: Floyd–Warshall and what each phase means

Floyd–Warshall computes all-pairs shortest paths with three loops:

```
for k = 1..n:                 // allow vertex k as a stop-over
    for a, for b:
        cost[a][b] = min(cost[a][b], cost[a][k] + cost[k][b])
```

The invariant is the useful part: **after phase k, cost[a][b] is the cheapest a → b route whose intermediate vertices all lie in {1, …, k}.** Usually only the final table matters, but the intermediate tables answer questions of the form "what if only the first k vertices existed?"

## How it maps onto this problem

### Step 1: years and stop-overs line up

The road between provinces i and t (t < i) is built in year i. So after year k the network is exactly the roads among provinces 1..k. A route from 1 to 2 that only stops at provinces ≤ k uses only such roads (its endpoints 1 and 2 are ≤ k too). Therefore:

> year k's answer = cost[1][2] after phase k.

### Step 2: one run, n − 2 answers

Read all roads first (keep the cheaper one if a pair repeats), run Floyd–Warshall with k in increasing order, and print cost[1][2] after every phase k ≥ 3. Phases 1 and 2 matter too: they prepare routes through provinces 1 and 2.

```diagram
sample: year 3: 1-2 = 10, via 3: 6 + 7 = 13        → 10
        year 4: 1-4-3-2 = 1 + 1 + 7 = 9             → 9
        year 5: 1-5-2 = 2 + 5 = 7                   → 7
```

{{viz}}

### Step 3: why not one Dijkstra per year

That is n Dijkstras on dense graphs, O(n³) as well, but with more code and a larger constant. The Floyd–Warshall view gives all years in a single, very tight triple loop (0.41 s for n = 700).

:::warn Traps
- Running k in any other order: the phase-k meaning only holds when the stop-overs are added as 1, 2, 3, ….
- Several roads between the same pair: keep the cheapest.
- c[1][2] can be 10⁶ while other roads are ≤ 1 000: sums stay below 2³¹ (the `NO_ROAD` sentinel is skipped before adding).
:::

## Solution

{{code}}

**Complexity.** The triple loop: **O(n³)** ≈ 3.4·10⁸ simple steps for n = 700. Memory: **O(n²)**.

{{tested}}
==== th
## เทคนิค: Floyd–Warshall และความหมายของแต่ละเฟส

Floyd–Warshall หาเส้นทางสั้นที่สุดทุกคู่ด้วยลูปสามชั้น:

```
for k = 1..n:                 // อนุญาตให้แวะจุด k
    for a, for b:
        cost[a][b] = min(cost[a][b], cost[a][k] + cost[k][b])
```

ส่วนที่มีประโยชน์คือ invariant: **หลังเฟส k cost[a][b] คือเส้นทาง a → b ที่ถูกที่สุดซึ่งจุดแวะระหว่างทางทั้งหมดอยู่ใน {1, …, k}** ปกติสนใจแค่ตารางสุดท้าย แต่ตารางระหว่างทางตอบคำถามแบบ "ถ้ามีแค่ k จุดแรก จะเป็นอย่างไร?"

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ปีกับจุดแวะตรงกัน

ถนนระหว่างจังหวัด i และ t (t < i) สร้างในปีที่ i หลังปีที่ k เครือข่ายจึงเป็นถนนระหว่างจังหวัด 1..k พอดี เส้นทางจาก 1 ไป 2 ที่แวะแค่จังหวัด ≤ k ใช้เฉพาะถนนเหล่านั้น (ปลายทาง 1 และ 2 ก็ ≤ k) ดังนั้น:

> คำตอบปีที่ k = cost[1][2] หลังเฟส k

### ขั้นที่ 2: รันครั้งเดียว ได้ n − 2 คำตอบ

อ่านถนนทั้งหมดก่อน (ถ้าคู่ซ้ำให้เก็บที่ถูกกว่า) รัน Floyd–Warshall โดย k เพิ่มขึ้น แล้วพิมพ์ cost[1][2] หลังทุกเฟส k ≥ 3 เฟส 1 และ 2 ก็สำคัญ: เตรียมเส้นทางที่ผ่านจังหวัด 1 และ 2

```diagram
ตัวอย่าง: ปี 3: 1-2 = 10, ผ่าน 3: 6 + 7 = 13        → 10
         ปี 4: 1-4-3-2 = 1 + 1 + 7 = 9             → 9
         ปี 5: 1-5-2 = 2 + 5 = 7                   → 7
```

{{viz}}

### ขั้นที่ 3: ทำไมไม่ใช้ Dijkstra ปีละครั้ง

นั่นคือ Dijkstra n ครั้งบนกราฟหนาแน่น เป็น O(n³) เหมือนกัน แต่โค้ดยาวกว่าและค่าคงที่ใหญ่กว่า มุมมอง Floyd–Warshall ให้คำตอบทุกปีในลูปสามชั้นที่กระชับมาก (0.41 วินาทีเมื่อ n = 700)

:::warn กับดัก
- ไล่ k ในลำดับอื่น: ความหมายของเฟส k ใช้ได้เมื่อเพิ่มจุดแวะเป็น 1, 2, 3, … เท่านั้น
- มีถนนหลายเส้นระหว่างคู่เดียวกัน: เก็บเส้นที่ถูกที่สุด
- c[1][2] เป็น 10⁶ ได้ ขณะที่ถนนอื่น ≤ 1 000: ผลรวมยังต่ำกว่า 2³¹ (ข้ามค่าเฝ้า `NO_ROAD` ก่อนบวก)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ลูปสามชั้น: **O(n³)** ≈ 3.4·10⁸ ขั้นง่าย ๆ เมื่อ n = 700 หน่วยความจำ: **O(n²)**

{{tested}}
