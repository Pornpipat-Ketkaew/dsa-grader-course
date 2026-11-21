D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex02e1_fibo
samp "1" "1"; samp "10" "55"; samp "17" "1597"
for n in $(seq 1 45); do samp "$n" "$(python3 -c "
a,b=0,1
for _ in range($n): a,b=b,a+b
print(a)")"; done
echo 45 > $D/big.in; timefast $D/big.in
echo "PASS cases=$NS (every N = 1..45)"
