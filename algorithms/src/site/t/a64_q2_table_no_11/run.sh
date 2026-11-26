D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a64_q2_table_no_11
samp "2" "7"; samp "3" "17"; samp "10" "8119"; samp "15" "665857"; samp "5467" "8124108"
for n in 1 2 3 4 5 6 7 8 9; do samp "$n" "$(echo $n | python3 $D/brute.py)"; done
echo 10000000 > $D/big.in
samp "10000000" "$(python3 -c "
M=100000007; e=t=b=1
for _ in range(2,10000001): e,t,b=(e+t+b)%M,(e+b)%M,(e+t)%M
print((e+t+b)%M)")"
timefast $D/big.in
echo "PASS samples=$NS (incl. brute force n = 1..9, n = 10^7)"
