D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a60_q1_matmod
samp "2 1000\n1 2 3 4" "7 10 15 22"
samp "2 10\n1 2 3 4" "7 0 5 2"
samp "5 10000\n1 2 3 4" "1069 1558 2337 3406"
samp "5 10\n1 2 3 4" "9 8 7 6"
samp "999888777 4726\n3 8 7 2" "337 2916 3733 1154"
samp "1 7\n9 8 7 6" "2 1 0 6"
samp "1073741824 1\n5 5 5 5" "0 0 0 0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# a big n checked against Python's pow-by-squaring on exact integers
python3 -c "
n,k=1073741823,9973
def mul(X,Y): return [(X[0]*Y[0]+X[1]*Y[2])%k,(X[0]*Y[1]+X[1]*Y[3])%k,(X[2]*Y[0]+X[3]*Y[2])%k,(X[2]*Y[1]+X[3]*Y[3])%k]
R=[1,0,0,1]; A=[9999,1234,5678,4321]; e=n
while e:
    if e&1: R=mul(R,A)
    A=mul(A,A); e>>=1
print(*R)" > $D/exp.txt
samp "1073741823 9973\n9999 1234 5678 4321" "$(cat $D/exp.txt)"
echo "PASS samples=$NS fuzz=$NF"
