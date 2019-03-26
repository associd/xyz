#include <stdio.h>

int parseSec(int time) {
   int hours, minute;
   hours = time / 100;
   minute = time % 100;
   return (hours * 3600) + (minute * 60);
}

int parseTime(int sec) {
   int hours = sec / 3600;
   int minute = (sec % 3600) / 60;
   return hours * 100 + minute;
}

int main() {
   int start, minute;
   scanf("%d %d", &start, &minute);

   printf("%d", parseTime(parseSec(start) + minute * 60));
   return 0;
}
