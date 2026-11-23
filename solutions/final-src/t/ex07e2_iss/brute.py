# list every non-decreasing sequence explicitly
n = int(input())
def count(rest, low):
    if rest == 0: return 1
    return sum(count(rest - a, a) for a in range(low, rest + 1))
print(count(n, 1))
