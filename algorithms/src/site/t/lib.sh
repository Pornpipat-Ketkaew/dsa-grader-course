# usage: source t/lib.sh; then: samp "<input>" "<expected>"  (whitespace-normalised compare)
set -e
norm() { tr -s ' \t\n' ' ' | sed 's/^ //; s/ $//'; }
samp() { local got exp; got=$(printf "%b" "$1" | timeout 10 $BIN | norm); exp=$(printf "%b" "$2" | norm);
  if [ "$got" != "$exp" ]; then echo "SAMPLE FAIL"; echo " in : $1"; echo " got: $got"; echo " exp: $exp"; exit 1; fi; NS=$((NS+1)); }
NS=0
# fuzz <count> <gen.py> <brute cmd>: gen.py takes seed
fuzz() { local n=$1 gen=$2 brute=$3 s; for s in $(seq $n); do python3 $gen $s > /tmp/fz_in_$$;
  a=$(timeout 10 $BIN < /tmp/fz_in_$$ | norm); b=$($brute < /tmp/fz_in_$$ | norm);
  if [ "$a" != "$b" ]; then echo "FUZZ FAIL seed $s"; cat /tmp/fz_in_$$ | head -20; echo "got: $a"; echo "exp: $b"; exit 1; fi; done; NF=$n; }
timeit() { local s=$(date +%s.%N); timeout 20 $BIN < $1 > /dev/null; echo "time $(echo "$(date +%s.%N) - $s" | bc)s"; }
# pkg <problem-id> <solution files...>: copy the starter project, overwrite with our solution files, compile main.cpp -> $BIN
pkg() { local id=$1; shift; local src=$(dirname $(find $D/../../../code/$id -name main.cpp | grep -v MACOSX | head -1));
  rm -rf $D/pkg; mkdir -p $D/pkg; cp -r $src/. $D/pkg/; for f in "$@"; do cp $D/../../sol/$id/$f $D/pkg/; done;
  g++ -std=c++17 -O2 -Wall -Wno-unused-result -Wno-sign-compare -fsanitize=address,undefined -o $BIN $D/pkg/main.cpp 2>&1 | grep -E "error" && exit 1; true; }
# prog <id>: compile a stand-alone sol/<id>/main.cpp -> $BIN (sanitized) and $BIN.fast (plain -O2, for timing)
prog() { g++ -std=c++17 -O2 -Wall -Wno-unused-result -Wno-sign-compare -fsanitize=address,undefined -o $BIN $D/../../sol/$1/main.cpp 2>&1 | grep -E "error" && exit 1;
  g++ -std=c++17 -O2 -o $BIN.fast $D/../../sol/$1/main.cpp; true; }
timefast() { local s=$(date +%s.%N); timeout 20 $BIN.fast < $1 > /dev/null; echo "time $(echo "$(date +%s.%N) - $s" | bc)s"; }
