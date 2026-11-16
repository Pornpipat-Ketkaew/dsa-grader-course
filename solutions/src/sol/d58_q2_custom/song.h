#ifndef __SONG_H__
#define __SONG_H__

#include <iostream>
#include <queue>
#include <string>
#include <vector>
#include "priority_queue.h"

using namespace std;

class Song {
  public:
    std::string artist,title;
    int count;

    Song() { }
    Song(const Song &s) : artist(s.artist), title(s.title), count(s.count) { }
    Song(std::string artist,std::string title,int count) :  artist(artist), title(title), count(count) { }

    friend std::ostream& operator<<(std::ostream &out,const Song &s) {
      return out << "Artist: " << s.artist << " Title: " << s.title << " count: " << s.count;
    }

};


//  you have to write something below this line 
//  you *MIGHT* have to change the declaration of pq1 and pq2

// HOW CP::priority_queue USES A COMPARATOR
//   cmp(a, b) == true  means  "a has LOWER priority than b"  (a is popped AFTER b).
//   top() is the element nobody beats.

// pq1: pop in order artist ASC, then title ASC, then count ASC.
//   The smallest (artist, title, count) must come out first,
//   so "a has lower priority" when a is BIGGER  ->  use > on each field.
class CompArtistTitleCount {
  public:
    bool operator()(const Song &a, const Song &b) const {
      if (a.artist != b.artist) return a.artist > b.artist;   // later artist name -> popped later
      if (a.title  != b.title)  return a.title  > b.title;    // same artist: later title -> later
      return a.count > b.count;                               // same both: bigger count -> later
    }
};

// pq2: pop in order count DESC, then artist ASC, then title ASC.
class CompCountArtistTitle {
  public:
    bool operator()(const Song &a, const Song &b) const {
      if (a.count  != b.count)  return a.count  < b.count;    // SMALLER count -> lower priority (DESC)
      if (a.artist != b.artist) return a.artist > b.artist;   // tie: later artist -> later (ASC)
      return a.title > b.title;                               // tie: later title -> later (ASC)
    }
};

CP::priority_queue<Song, CompArtistTitleCount> pq1;
CP::priority_queue<Song, CompCountArtistTitle> pq2;

#endif
