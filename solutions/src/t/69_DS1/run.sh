D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg 69_DS1 student.h
samp "4\n8 3 10 6" "8 3 10 0 6 0 0"
samp "3\n8 6 4" "8 6 0 4 0 0 0"
samp "1\n5" "5"
samp "7\n8 3 12 6 10 4 11" "8 3 12 0 6 10 0 0 0 4 0 0 11 0 0"
samp "2\n5 9" "5 0 9"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# 65,535 keys in random order (height about 35 would be 2^35 slots, so build a PERFECT tree:
# insert medians first -> 16 levels, 65,535 slots, all full)
python3 -c "
import sys
sys.setrecursionlimit(10000)
out=[]
def go(lo,hi):
    if lo>hi: return
    m=(lo+hi)//2; out.append(m); go(lo,m-1); go(m+1,hi)
go(1,65535); print(len(out)); print(*out)" > $D/big.in
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast; timeit $D/big.in
[ "$($BIN < $D/big.in | wc -w)" = 65535 ] || { echo "PERFECT FAIL"; exit 1; }
echo "PASS samples=$NS fuzz=$NF"
