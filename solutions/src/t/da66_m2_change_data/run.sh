D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg da66_m2_change_data student.h
samp "1 1 2\n2\n3\n2 1 2\n2 1 4\n2 5 6\n1\n2 7 1" "7,2, 2,2, 2,4, 5,6,"
samp "2 1 2\n3\na\n3 1 2 3\n6\nb\n3 7 8 9\n1\nc\n2 1 -20\n99" "a:3 2 2 ,6 b:9 8 7 ,2 c:2 -20 ,99"
samp "3 1 2\n2\n5 1 2 3 4 5\n3\n1 2 a\n3 4 b\n5 1 c\n4 -9 1 -7 1\n3\n9 2 dd\n8 3 aa\n11 4 bb" "-9 2 -7 2 | 8:3,aa 9:2,dd 11:4,bb 2 2 3 4 5 | 2:2,a 3:4,b 5:2,c"
fuzz 400 $D/gen.py "python3 $D/brute.py"
# timing: ~10^6 ints in each structure
python3 -c "
import random; r=random.Random(1); print(1,5,7); print(1000)
for _ in range(1000):
    print(10)
    for _ in range(10): q=[r.randint(1,9) for _ in range(100)]; print(len(q),*q)" > $D/big.in
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast; timeit $D/big.in
python3 -c "
import random; r=random.Random(2); print(2,5,7); print(10000)
for i in range(10000): print('k%d'%i); q=[r.randint(1,9) for _ in range(100)]; print(len(q),*q); print(5)" > $D/big.in; timeit $D/big.in
python3 -c "
import random; r=random.Random(3); print(3,5,7); print(10000)
for i in range(10000): l=[r.randint(1,9) for _ in range(50)]; print(len(l),*l); print(10); [print(k,r.randint(1,9),'s') for k in range(i*20, i*20+20, 2)]" > $D/big.in; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF"
