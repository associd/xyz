#include <stdio.h>
#include <string.h>


int main() {
   char s[] = "abc";
   char s2[] = "def";

   strcat(s, s2);

   printf("%s\n", s);

   return 0;
}
