D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da67_f_abc_permutation
samp "2 0 1 3" "3 BC CB CC"
samp "2 1 1 3" "7 AB AC BA BC CA CB CC"
samp "4 2 1 1" "12 AABC AACB ABAC ABCA ACAB ACBA BAAC BACA BCAA CAAB CABA CBAA"
samp "4 1 2 1" "12 ABBC ABCB ACBB BABC BACB BBAC BBCA BCAB BCBA CABB CBAB CBBA"
samp "5 2 3 0" "10 AABBB ABABB ABBAB ABBBA BAABB BABAB BABBA BBAAB BBABA BBBAA"
samp "3 0 0 2" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "12 12 12 12" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
