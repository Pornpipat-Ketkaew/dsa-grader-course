title: Day Cover
title_th: Day Cover (ครอบคลุมทุกวัน)
stars: 3
tech: Subset backtracking (invite / skip), Branch and bound, Bitset union
tech_th: Backtracking เลือกเซตย่อย (เชิญ / ข้าม), Branch and bound, รวมวันด้วย bitset
complexity: O(2^m · n/64) worst case, far less with the bound · O(m · n) bits memory
key: Each student is either invited or skipped, so the search tree is the 2^m subsets. Cut a branch once it already uses as many students as the best answer, and stop a branch the moment every day is covered. A bitset per student makes "add this student's days" one OR.
key_th: นิสิตแต่ละคนถูกเชิญหรือถูกข้าม ต้นไม้ค้นหาจึงเป็นเซตย่อยทั้ง 2^m แบบ ตัดกิ่งเมื่อจำนวนคนที่ใช้เท่ากับคำตอบที่ดีที่สุดแล้ว และหยุดกิ่งทันทีที่ครอบคลุมทุกวัน bitset ของนิสิตแต่ละคนทำให้ "เพิ่มวันของนิสิตคนนี้" เป็นการ OR ครั้งเดียว
tests: the 2 PDF samples, a 1-day case and 300 random cases against a brute force over all subsets; four n = 1000, m = 20 cases (all 20 needed, one student covers all, thin random sets, answer 10) each under 0.02 s.
tests_th: ตัวอย่างทั้ง 2 ใน PDF กรณีวันเดียว และสุ่ม 300 ชุดเทียบกับ brute force ที่ลองทุกเซตย่อย และกรณี n = 1000, m = 20 สี่แบบ (ต้องใช้ครบ 20 คน, มีคนเดียวว่างทุกวัน, เซตสุ่มบาง ๆ, คำตอบ 10) แต่ละกรณีใช้ไม่ถึง 0.02 วินาที
==== en
## Technique: subset backtracking + branch and bound

"Pick a smallest group" is a **subset search**: one level per item, two branches per level (take it / leave it), 2^m leaves.

```cpp
void choose(item, count, state) {
    if (count >= best) return;          // bound: cannot beat the best
    if (state is complete) { best = count; return; }
    if (item == itemCount) return;      // nothing left to take
    choose(item + 1, count + 1, state + item);   // take
    choose(item + 1, count, state);              // leave
}
```

With m ≤ 20 the full tree has about 10⁶ leaves, which is already fast; the bound makes it much smaller.

## How it maps onto this problem

### Step 1: the state is "which days are covered"

The state after some decisions is the set of covered days. Store it as a `bitset<1000>`: bit `day − 1` is 1 when someone invited is free that day. Each student's free days are also a bitset, so inviting student `student` is

```cpp
covered | freeDays[student]
```

one OR over 1000 bits (16 machine words), instead of a loop over that student's days.

### Step 2: three ways a call ends

1. **Bound** `invited >= bestCount`: even if this branch finishes now, it uses at least as many students as the best plan found. Cut.
2. **Complete** `covered == allDays`: every day has a helper. Record `bestCount = invited`. Inviting more students only increases the count, so return right here instead of exploring the rest.
3. **Dead end** `student == studentCount`: nobody left to invite and a day is still empty.

The order matters: check the bound first, so a complete-but-not-better branch is not recorded.

### Step 3: why "invite first" helps

Trying "invite" before "skip" reaches a complete cover quickly (inviting everyone always covers every day, since an answer is guaranteed). That first answer sets `bestCount`, and from then on every branch that has already invited `bestCount` students is cut immediately.

{{viz}}

:::warn Traps
- `allDays` must have exactly bits 0..n−1 set. Comparing with a bitset of all 1000 ones fails whenever n < 1000.
- Days in the input are 1-based: use bit `day − 1`.
- Start `bestCount` above any real answer (m + 1), so the first complete cover is always recorded.
:::

## Solution

{{code}}

**Complexity.** At most 2^m nodes, each with an O(n/64) bitset OR and comparison; the bound and the early stop cut most of them. For n = 1000, m = 20 every test runs in about 0.02 s. Memory: m + 1 bitsets of n bits.

{{tested}}
==== th
## เทคนิค: backtracking เลือกเซตย่อย + branch and bound

"เลือกกลุ่มที่เล็กที่สุด" คือ **การค้นหาเซตย่อย**: หนึ่งระดับต่อหนึ่งสิ่งของ สองกิ่งต่อระดับ (เอา / ไม่เอา) มีใบ 2^m ใบ

```cpp
void choose(item, count, state) {
    if (count >= best) return;          // ขอบเขต: ชนะ best ไม่ได้
    if (state is complete) { best = count; return; }
    if (item == itemCount) return;      // ไม่เหลืออะไรให้เลือก
    choose(item + 1, count + 1, state + item);   // เอา
    choose(item + 1, count, state);              // ไม่เอา
}
```

เมื่อ m ≤ 20 ต้นไม้เต็มมีใบประมาณ 10⁶ ใบซึ่งก็เร็วอยู่แล้ว ขอบเขตทำให้เล็กลงอีกมาก

## นำมาใช้กับโจทย์นี้อย่างไร

### ขั้นที่ 1: สถานะคือ "วันไหนครอบคลุมแล้ว"

สถานะหลังตัดสินใจไปบางส่วนคือเซตของวันที่ครอบคลุมแล้ว เก็บเป็น `bitset<1000>`: บิต `day − 1` เป็น 1 เมื่อมีคนที่ถูกเชิญว่างในวันนั้น วันว่างของนิสิตแต่ละคนก็เป็น bitset เช่นกัน การเชิญนิสิต `student` จึงเป็น

```cpp
covered | freeDays[student]
```

การ OR ครั้งเดียวบน 1000 บิต (16 word ของเครื่อง) แทนการวนทีละวันของนิสิตคนนั้น

### ขั้นที่ 2: สามแบบที่การเรียกจะจบ

1. **ขอบเขต** `invited >= bestCount`: ต่อให้กิ่งนี้จบตอนนี้ ก็ใช้คนไม่น้อยกว่าแผนที่ดีที่สุดที่เจอแล้ว ตัดทิ้ง
2. **ครบ** `covered == allDays`: ทุกวันมีคนช่วย บันทึก `bestCount = invited` การเชิญเพิ่มมีแต่ทำให้จำนวนมากขึ้น จึง return ตรงนี้เลย ไม่ต้องสำรวจส่วนที่เหลือ
3. **ทางตัน** `student == studentCount`: ไม่เหลือใครให้เชิญแล้วแต่ยังมีวันที่ว่าง

ลำดับสำคัญ: ตรวจขอบเขตก่อน กิ่งที่ครบแต่ไม่ดีกว่าจะได้ไม่ถูกบันทึก

### ขั้นที่ 3: ทำไม "เชิญก่อน" จึงช่วย

การลอง "เชิญ" ก่อน "ข้าม" ทำให้ไปถึงการครอบคลุมครบได้เร็ว (เชิญทุกคนย่อมครอบคลุมทุกวันเพราะรับประกันว่ามีคำตอบ) คำตอบแรกนั้นตั้งค่า `bestCount` และหลังจากนั้นทุกกิ่งที่เชิญไปแล้ว `bestCount` คนจะถูกตัดทันที

{{viz}}

:::warn กับดัก
- `allDays` ต้องมีบิต 0..n−1 เป็น 1 พอดี ถ้าเทียบกับ bitset ที่เป็น 1 ครบ 1000 บิตจะผิดทุกครั้งที่ n < 1000
- วันในอินพุตเริ่มที่ 1: ใช้บิต `day − 1`
- เริ่ม `bestCount` ที่ค่ามากกว่าคำตอบจริงทุกค่า (m + 1) เพื่อให้การครอบคลุมครบครั้งแรกถูกบันทึกเสมอ
:::

## โค้ดเฉลย

{{code}}

**ความซับซ้อน** ไม่เกิน 2^m โหนด แต่ละโหนดทำ OR และเปรียบเทียบ bitset ใน O(n/64) ขอบเขตและการหยุดเร็วตัดส่วนใหญ่ออก เมื่อ n = 1000, m = 20 ทุกชุดทดสอบใช้ราว 0.02 วินาที หน่วยความจำ: bitset m + 1 ตัว ตัวละ n บิต

{{tested}}
