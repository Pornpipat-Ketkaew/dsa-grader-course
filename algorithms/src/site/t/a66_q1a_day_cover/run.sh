D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a66_q1a_day_cover
samp "2 3\n1 1\n1 2\n2 1 2" "1"
samp "5 4\n3 1 3 5\n3 1 2 3\n2 2 5\n2 3 4" "3"
samp "1 1\n1 1" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# worst case for pruning: 20 students with disjoint 50-day blocks -> all 20 needed
python3 -c "
print(1000, 20)
for s in range(20): print(50, *range(s*50+1, s*50+51))" > $D/big.in
samp "$(cat $D/big.in)" "20"
timefast $D/big.in
# 20 students each free on a random half of the days, plus one who is free every day
python3 -c "
import random; random.seed(9); print(1000, 20)
for s in range(19): d=sorted(random.sample(range(1,1001),500)); print(len(d),*d)
print(1000,*range(1,1001))" > $D/big2.in
samp "$(cat $D/big2.in)" "1"
# no single student and no pair covers everything: thin random sets
python3 -c "
import random; random.seed(11); print(1000, 20)
S=[set(random.sample(range(1,1001),150)) for _ in range(20)]
for d in range(1,1001):
    if not any(d in s for s in S): S[random.randrange(20)].add(d)
for s in S: s=sorted(s); print(len(s),*s)" > $D/big3.in
samp "$(cat $D/big3.in)" "$(python3 $D/brute.py < $D/big3.in)"
timefast $D/big3.in
# answer 10: one student of each of 10 pairs owns a 100-day block (checked once with brute.py: 10, 19 s)
python3 -c "
import random; random.seed(5); print(1000,20)
for s in range(20):
    b=s//2; d=set(range(b*100+1,b*100+101))
    for x in random.sample(range(1,1001),90): d.add(x)
    d=sorted(d); print(len(d),*d)" > $D/big4.in
samp "$(cat $D/big4.in)" "10"
timefast $D/big4.in
echo "PASS samples=$NS fuzz=$NF"
