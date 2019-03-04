#include <stdio.h>

#define MAXN 10

int Sum ( int List[], int N );

int main ()
{
    int List[MAXN], N, i;

    scanf("%d", &N);
    for ( i=0; i<N; i++ )
        scanf("%d", &List[i]);
    printf("%d\n", Sum(List, N));

    return 0;
}

/* 你的代码将被嵌在这里 */

int Sum ( int List[], int N ) {
   while(N >= 2) {
      List[N - 2] += List[N - 1];
      N--;
   }
   return List[0];
}
