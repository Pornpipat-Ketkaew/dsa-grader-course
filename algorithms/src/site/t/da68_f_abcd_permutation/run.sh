D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f_abcd_permutation
samp "2 2 2 1 0" "8 AA AB AC BA BB BC CA CB"
samp "5 3 0 2 0" "10 AAACC AACAC AACCA ACAAC ACACA ACCAA CAAAC CAACA CACAA CCAAA"
samp "4 1 1 1 1" "24 ABCD ABDC ACBD ACDB ADBC ADCB BACD BADC BCAD BCDA BDAC BDCA CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "9 9 9 9 9" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
