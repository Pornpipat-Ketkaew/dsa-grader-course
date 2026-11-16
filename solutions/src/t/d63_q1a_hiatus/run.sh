D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d63_q1a_hiatus
samp "3 4\n2019 10\n2020 1\n2020 8\n2020 1\n2019 12\n2020 11\n2018 1" "0 0 2019 10 2020 8 -1 -1"
samp "2 3\n100000 1\n1 12\n1 12\n1 11\n100000 2" "0 0 -1 -1 100000 1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
