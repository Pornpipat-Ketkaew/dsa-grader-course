D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
g++ -O2 -Wall -fsanitize=address,undefined -o $BIN $D/../../sol/d63_q1a_multi_insert/main.cpp
samp "3 -1 1 3\n10 20 30" "After call multiple_add Size = 6 10 -1 -1 -1 20 30"
samp "3 7 3 2\n10 20 30" "After call multiple_add Size = 5 10 20 30 7 7"
samp "0 5 0 3\n" "After call multiple_add Size = 3 5 5 5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
g++ -O2 -o $BIN $D/../../sol/d63_q1a_multi_insert/main.cpp
python3 -c "print(100,1,50,1000000);print(*range(100))" > $D/big; timeit $D/big
echo "PASS samples=$NS fuzz=$NF"
