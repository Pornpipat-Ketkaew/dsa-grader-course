D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex02e2_cnk
samp "10 3" "120"; samp "10 10" "1"; samp "30 15" "155117520"
for n in $(seq 1 30); do for k in $(seq 1 $n); do
  [ "$(echo $n $k | $BIN.fast)" = "$(python3 -c "import math; print(math.comb($n,$k))")" ] || { echo "FAIL $n $k"; exit 1; }; NS=$((NS+1)); done; done
echo "PASS cases=$NS (every 1 <= K <= N <= 30)"
