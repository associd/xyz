#include <stdio.h>

char uppercase(char c);
int sumof100_300() {
	int sum = 0;
	int i = 100;
	while(i++ <= 300) {
		sum += i;
	}
	return sum;
}
int main(void) {
	// char input;
	// printf("please type letter/n");
	// scanf("%c", &input);
	// printf("uppercase is %c", uppercase(input));
   printf("%d", sumof100_300());
}

char uppercase(char c) {
   return c - 32;
}
