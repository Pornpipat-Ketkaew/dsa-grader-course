#ifndef _STUDENT_H_
#define _STUDENT_H_

#include <vector>
#include <map>
#include <algorithm>

// Only the mapped values matter, and the map is sorted by KEY, not by value.
// Copy the values out once, sort them, and every query becomes two binary searches.
std::vector<size_t> count_value(const std::map<long long, int> &data, const std::vector<std::pair<int, int>> &queries) {
    std::vector<int> values;
    values.reserve(data.size());
    // every (key, value) pair in the map: keep the value
    for (const auto &entry : data) values.push_back(entry.second);
    std::sort(values.begin(), values.end());

    std::vector<size_t> result;
    result.reserve(queries.size());
    // every query in order
    for (const auto &query : queries) {
        int low = query.first, high = query.second;
        // the values in [low, high] are one block of the sorted vector
        auto first = std::lower_bound(values.begin(), values.end(), low);
        auto pastLast = std::upper_bound(values.begin(), values.end(), high);
        result.push_back(pastLast > first ? size_t(pastLast - first) : 0);   // low > high: empty
    }
    return result;
}

#endif
