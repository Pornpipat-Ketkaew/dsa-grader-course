title: Election Winner
title_th: หาผู้ชนะเลือกตั้ง
stars: 1
tech: Hash map counting, Selection (nth_element)
tech_th: นับด้วย hash map, การเลือกอันดับ (nth_element)
complexity: O(N · L) time · O(N) memory
key: Count ballots per name in a hash map, keep only the totals, and select the K-th largest total. Ties never change that number.
key_th: นับคะแนนของแต่ละชื่อด้วย hash map เก็บไว้แค่ยอดรวม แล้วเลือกยอดที่มากเป็นอันดับ K ผู้ที่คะแนนเท่ากันไม่ทำให้ตัวเลขนี้เปลี่ยน
tests: both PDF samples and 300 random elections (ties, K larger than the number of candidates, one candidate) against a brute force that sorts all totals. ASan + UBSan clean.
tests_th: ตัวอย่างทั้ง 2 ชุดใน PDF และสุ่ม 300 ชุด (คะแนนเสมอ, K มากกว่าจำนวนผู้สมัคร, ผู้สมัครคนเดียว) เทียบกับ brute force ที่เรียงยอดทั้งหมด ไม่พบข้อผิดพลาดจาก ASan + UBSan
==== en
## Technique: count with a hash map, then select a rank

Two textbook tools from Lesson 09:

1. **Counting by key.** When items are identified by a *name* rather than a small integer, a hash map `unordered_map<string,int>` plays the role of the counting array: `votesOf[name]++` is O(1) on average (plus O(L) to hash a name of length L).
2. **Selection.** "The K-th largest value" does not need a full sort. `nth_element` rearranges a vector so that position k holds exactly the element a full sort would put there, in **O(m)** average time.

## How it maps onto this problem

### Step 1: turn ballots into totals

Every ballot adds one vote to one name. After the reading loop, the map holds one entry per candidate who got at least one vote. Candidates with zero votes never appear, which is exactly what the statement wants ("an elected person must have at least 1 vote").

### Step 2: the names do not matter any more

The question asks for a **number of votes**, not a name. So copy the map's values into a plain `vector<int> totals` and forget the names.

### Step 3: which rank do we need?

Sort the totals from most to fewest in your head:

```diagram
sample 1: somchai 3, adisak 2, yingyos 2, direk 1     K = 2

rank (0-based)   0    1    2    3
totals         [ 3 ][ 2 ][ 2 ][ 1 ]
                      ▲
                      K-th place = index K-1 = 1  →  answer 2
```

:::key Why ties are harmless
The rule "everyone tied with the K-th place is also elected" adds more winners, but every added winner has **the same total** as the K-th place. The smallest winning total is therefore still `totals[K-1]` in descending order.
:::

:::key Fewer than K candidates
If only m < K names received votes, all m win and the weakest is the last one, index m − 1. Both cases are covered by `lastPlace = min(K, m) − 1`.
:::

### Step 4: select instead of sort

`nth_element(begin, begin + lastPlace, end, greater<int>())` puts the (lastPlace+1)-th largest value at `totals[lastPlace]`, with bigger values to its left and smaller ones to its right (in no particular order). That is all we need.

{{viz}}

:::warn Traps
- Printing a **name** or the **count of winners** instead of the vote total.
- Indexing `totals[K-1]` when there are fewer than K candidates (out of range).
- Forgetting that the same name can appear on many lines: you must aggregate first, then rank.
:::

## Solution

{{code}}

**Complexity.** Reading and hashing N names of length ≤ 20: O(N·L). The vector has m ≤ N totals and `nth_element` is O(m) on average. Memory O(N). With N ≤ 1000 any correct method is fast; this one is also the asymptotically best.

{{tested}}
==== th
## เทคนิค: นับด้วย hash map แล้วเลือกอันดับ

ใช้เครื่องมือมาตรฐานสองอย่างจากบทที่ 09:

1. **การนับตามคีย์** เมื่อสิ่งที่นับระบุด้วย *ชื่อ* แทนที่จะเป็นจำนวนเต็มเล็ก ๆ ให้ใช้ hash map `unordered_map<string,int>` แทนอาร์เรย์นับ `votesOf[name]++` ใช้เวลาเฉลี่ย O(1) (บวก O(L) สำหรับแฮชชื่อยาว L)
2. **การเลือกอันดับ (selection)** "ค่าที่มากเป็นอันดับ K" ไม่จำเป็นต้องเรียงทั้งหมด `nth_element` จัดเวกเตอร์ใหม่ให้ตำแหน่ง k มีค่าเดียวกับที่การเรียงเต็มจะวางไว้ ใช้เวลาเฉลี่ย **O(m)**

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: เปลี่ยนบัตรลงคะแนนเป็นยอดรวม

บัตรแต่ละใบเพิ่มหนึ่งคะแนนให้หนึ่งชื่อ หลังวนอ่านเสร็จ map จะมีหนึ่งรายการต่อผู้สมัครหนึ่งคนที่ได้อย่างน้อยหนึ่งคะแนน ผู้สมัครที่ได้ศูนย์คะแนนจะไม่ปรากฏเลย ซึ่งตรงกับเงื่อนไขของโจทย์ ("ผู้ได้รับเลือกต้องได้อย่างน้อย 1 คะแนน") พอดี

### ขั้นที่ 2: ชื่อไม่สำคัญอีกต่อไป

คำถามต้องการ **จำนวนคะแนน** ไม่ใช่ชื่อ จึงคัดลอกค่าจาก map ลง `vector<int> totals` ธรรมดาแล้วทิ้งชื่อไป

### ขั้นที่ 3: ต้องการอันดับไหน?

ลองนึกภาพเรียงยอดจากมากไปน้อย:

```diagram
ตัวอย่าง 1: somchai 3, adisak 2, yingyos 2, direk 1     K = 2

อันดับ (เริ่ม 0)  0    1    2    3
totals         [ 3 ][ 2 ][ 2 ][ 1 ]
                      ▲
                      อันดับที่ K = index K-1 = 1  →  คำตอบ 2
```

:::key ทำไมคะแนนเสมอไม่มีผล
กฎ "ทุกคนที่คะแนนเท่ากับอันดับ K ได้รับเลือกด้วย" ทำให้มีผู้ชนะเพิ่ม แต่ผู้ชนะที่เพิ่มมาทุกคนมี **คะแนนเท่ากับอันดับ K** คะแนนต่ำสุดของผู้ชนะจึงยังเป็น `totals[K-1]` ในลำดับจากมากไปน้อย
:::

:::key ผู้สมัครน้อยกว่า K คน
ถ้ามีเพียง m < K ชื่อที่ได้คะแนน ทั้ง m คนชนะ และคนที่อ่อนที่สุดอยู่ index m − 1 ทั้งสองกรณีรวมเป็นสูตรเดียวคือ `lastPlace = min(K, m) − 1`
:::

### ขั้นที่ 4: เลือก ไม่ต้องเรียง

`nth_element(begin, begin + lastPlace, end, greater<int>())` วางค่าที่มากเป็นอันดับ (lastPlace+1) ไว้ที่ `totals[lastPlace]` โดยค่าที่มากกว่าอยู่ทางซ้ายและค่าที่น้อยกว่าอยู่ทางขวา (ไม่เรียงกันภายใน) แค่นี้ก็พอแล้ว

{{viz}}

:::warn กับดัก
- พิมพ์ **ชื่อ** หรือ **จำนวนผู้ชนะ** แทนจำนวนคะแนน
- เข้าถึง `totals[K-1]` เมื่อผู้สมัครมีน้อยกว่า K คน (เกินขอบเขต)
- ลืมว่าชื่อเดียวกันปรากฏได้หลายบรรทัด ต้องรวมคะแนนก่อนแล้วค่อยจัดอันดับ
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** อ่านและแฮชชื่อ N ชื่อ ยาวไม่เกิน 20: O(N·L) เวกเตอร์มียอดรวม m ≤ N ค่า และ `nth_element` เฉลี่ย O(m) หน่วยความจำ O(N) เมื่อ N ≤ 1000 วิธีที่ถูกต้องทุกวิธีเร็วพอ แต่วิธีนี้ดีที่สุดในเชิงอะซิมโทติกด้วย

{{tested}}
