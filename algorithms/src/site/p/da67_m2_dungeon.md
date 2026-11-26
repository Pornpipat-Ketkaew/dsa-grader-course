title: Welcome to the Dungeon
title_th: Welcome to the Dungeon (ดันเจียน)
stars: 2
tech: Greedy (cheapest first per type), Bucket by type + sort + pointer, Simulation in order
tech_th: Greedy (ถูกที่สุดก่อนในแต่ละชนิด), แยกถังตามชนิด + เรียง + ตัวชี้, จำลองตามลำดับ
complexity: O(D log D + total q) time · O(D + Z) memory
key: Bosses must be beaten in order and every item vanishes after one boss, so each needed item costs one new dungeon of that type. Paying the cheapest unexplored dungeon of the type is never worse, so sort each type's costs once and walk a pointer; stop at the first item you cannot afford or cannot find.
key_th: ต้องปราบจอมมารตามลำดับ และไอเท็มทุกชิ้นสลายหลังใช้กับจอมมารหนึ่งตน ไอเท็มที่ต้องใช้แต่ละชิ้นจึงต้องสำรวจดันเจียนชนิดนั้นใหม่หนึ่งแห่ง การจ่ายดันเจียนที่ถูกที่สุดที่ยังไม่สำรวจไม่มีทางแย่กว่า จึงเรียงค่าของแต่ละชนิดครั้งเดียวแล้วเลื่อนตัวชี้ หยุดที่ไอเท็มแรกที่จ่ายไม่ไหวหรือหาไม่ได้
tests: both PDF samples, three extra hand cases (running out of power, bosses needing nothing), 400 random cases against a brute force, and N = D = 100 000 with 100 items per boss (10^7 numbers) in 0.02 s.
tests_th: ตัวอย่างทั้งสองใน PDF กรณีที่เขียนเองสามกรณี (พลังหมด, จอมมารที่ไม่ต้องใช้อะไร) สุ่ม 400 ชุดเทียบกับ brute force และ N = D = 100 000 จอมมารละ 100 ไอเท็ม (10^7 ตัวเลข) ใช้ 0.02 วินาที
==== en
## Technique: greedy "cheapest available first", with buckets

Many greedy problems reduce to: *a sequence of demands arrives in a fixed order; each demand consumes one resource of a given kind; resources of a kind differ only in cost.* Then serving each demand with the **cheapest remaining resource of its kind** is optimal, by exchange: if a solution uses a more expensive one while a cheaper one of the same kind stays unused (or is used later), swapping the two never increases the total cost spent up to any point.

The data structure is simple: one **bucket per kind**, sorted once, plus a **pointer** to the next unused element. No priority queue is needed because nothing is ever added.

## How it maps onto this problem

### Step 1: demands and resources

- Bosses are fought in the fixed order 0, 1, …, N−1.
- Boss b needs the item types on its line. Items vanish after use, so **every** needed item is a new demand, even if a previous boss needed the same type.
- A dungeon of type z is a resource of kind z with cost t; each dungeon can be explored once.

### Step 2: buckets and pointers

```diagram
costOfType[0] = [1, 40]    nextUnused[0] = 0
costOfType[1] = [2]        nextUnused[1] = 0
costOfType[5] = [13]       ...
costOfType[9] = [4]
```

For each demand of type z: if `nextUnused[z]` is at the end, the boss cannot be beaten. Otherwise subtract `costOfType[z][nextUnused[z]++]` from the power; if the power drops below 0, this boss cannot be beaten either.

### Step 3: stop at the first failure

The bosses must be defeated **in order**, so the answer is the number of bosses before the first failure. The program prints it and returns immediately; the rest of the input does not need to be read.

{{viz}}

:::warn Traps
- Treating a type as "owned" after collecting it once: items vanish after each boss.
- Power can reach 0 exactly and the boss is still defeated (the condition is "not less than 0").
- T up to 10^9 and up to 10^7 costs: keep the power in `long long`, and use fast I/O as the PDF suggests.
- A boss with q = 0 needs nothing and is always defeated (if reached).
:::

## Solution

{{code}}

**Complexity.** Sorting the buckets: **O(D log D)**; each item read is O(1): **O(total q)**. Memory: **O(D + Z)**.

{{tested}}
==== th
## เทคนิค: greedy "ถูกที่สุดที่ยังมีก่อน" ด้วยถัง

โจทย์ greedy หลายข้อลดรูปได้เป็น: *ความต้องการชุดหนึ่งมาตามลำดับที่กำหนด แต่ละความต้องการใช้ทรัพยากรชนิดหนึ่งไปหนึ่งหน่วย ทรัพยากรชนิดเดียวกันต่างกันแค่ราคา* แล้วการตอบแต่ละความต้องการด้วย **ทรัพยากรที่ถูกที่สุดที่เหลืออยู่ของชนิดนั้น** ดีที่สุด ด้วยการสลับ: ถ้าคำตอบหนึ่งใช้ตัวที่แพงกว่าในขณะที่ตัวที่ถูกกว่าชนิดเดียวกันไม่ถูกใช้ (หรือถูกใช้ทีหลัง) การสลับสองตัวนั้นไม่ทำให้ค่าที่จ่ายไปจนถึงจุดใด ๆ เพิ่มขึ้น

โครงสร้างข้อมูลเรียบง่าย: **ถังละหนึ่งชนิด** เรียงครั้งเดียว พร้อม **ตัวชี้** ไปยังตัวถัดไปที่ยังไม่ใช้ ไม่ต้องใช้ priority queue เพราะไม่มีการเพิ่มของเข้าไปเลย

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: ความต้องการและทรัพยากร

- ปราบจอมมารตามลำดับที่ตายตัว 0, 1, …, N−1
- จอมมาร b ต้องใช้ไอเท็มชนิดที่อยู่ในบรรทัดของมัน ไอเท็มสลายหลังใช้ **ทุก** ไอเท็มที่ต้องใช้จึงเป็นความต้องการใหม่ แม้จอมมารก่อนหน้าจะใช้ชนิดเดียวกัน
- ดันเจียนชนิด z คือทรัพยากรชนิด z ราคา t แต่ละแห่งสำรวจได้ครั้งเดียว

### ขั้นที่ 2: ถังและตัวชี้

```diagram
costOfType[0] = [1, 40]    nextUnused[0] = 0
costOfType[1] = [2]        nextUnused[1] = 0
costOfType[5] = [13]       ...
costOfType[9] = [4]
```

สำหรับความต้องการชนิด z แต่ละครั้ง: ถ้า `nextUnused[z]` อยู่ท้ายสุดแล้ว ปราบจอมมารตนนี้ไม่ได้ ไม่อย่างนั้นลบ `costOfType[z][nextUnused[z]++]` ออกจากพลัง ถ้าพลังต่ำกว่า 0 ก็ปราบตนนี้ไม่ได้เช่นกัน

### ขั้นที่ 3: หยุดที่ความล้มเหลวครั้งแรก

ต้องปราบจอมมาร **ตามลำดับ** คำตอบจึงเป็นจำนวนจอมมารก่อนความล้มเหลวครั้งแรก โปรแกรมพิมพ์แล้ว return ทันที ไม่ต้องอ่านอินพุตที่เหลือ

{{viz}}

:::warn กับดัก
- ถือว่า "มี" ไอเท็มชนิดนั้นแล้วหลังเก็บได้ครั้งหนึ่ง: ไอเท็มสลายหลังใช้กับจอมมารแต่ละตน
- พลังลดถึง 0 พอดียังปราบได้ (เงื่อนไขคือ "ไม่น้อยกว่า 0")
- T ถึง 10^9 และค่าใช้จ่ายถึง 10^7 ตัว: เก็บพลังเป็น `long long` และใช้ fast I/O ตามที่ PDF แนะนำ
- จอมมารที่ q = 0 ไม่ต้องใช้อะไร ปราบได้เสมอ (ถ้าไปถึง)
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** เรียงถัง: **O(D log D)** อ่านไอเท็มแต่ละตัว O(1): **O(total q)** หน่วยความจำ: **O(D + Z)**

{{tested}}
