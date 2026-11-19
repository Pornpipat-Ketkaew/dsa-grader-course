D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_DS2
samp "6\nI 5 2 123\nD\nE 2 2 123\nD\nO 123\nD" "3 5 4 7 0 0"
samp "8\nI 5 2 101\nD\nI 4 2 202\nD\nM 101\nD\nS 202\nD" "3 5 5 9 3 9 5 9"
samp "6\nI 3 2 101\nD\nM 999\nD\nS 999\nD" "2 3 2 3 2 3"
# the PDF's Split example: rooms (2,2) (6,5) (4,3) -> 6 rooms, 10 guests
samp "6\nI 2 2 7\nI 5 6 7\nI 3 4 7\nD\nS 7\nD" "3 10 6 10"
samp "4\nE 3 2 5\nD\nO 77\nD" "2 3 2 3"
samp "0" ""
fuzz 400 $D/gen.py "python3 $D/brute.py"
python3 -c "
print(100)
for i in range(30): print('I',100000,2,i)
for i in range(30): print('S',i)
for i in range(30): print('M',i)
for i in range(10): print('D')" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
