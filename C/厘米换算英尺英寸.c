#include <stdio.h>

int main() {
   double cm, foot, inch, t = 30.48;
   scanf("%lf", &cm);
   foot = cm / t;
   inch = ((cm  / t) - ((int)foot)) * 12;
   printf("%d %d", (int)foot, (int)inch);
   return 0;
}
