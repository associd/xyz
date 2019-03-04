//// printN.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
////
//
//#include "pch.h"
//#include <iostream>
//#include <stdio.h>
//
//void PrintN(int N);
//
//int main()
//{
//	int N;
//	scanf_s("%d", &N);
//	PrintN(N);
//	return 0;
//}
//
//
//void PrintN(int N) {
//	if (N <= 1) {
//		printf("%d\n", 1);
//	}
//	else {
//		PrintN(N - 1);
//		printf("%d\n", N);
//	}
//}



// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门提示: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件


#include "pch.h"
#include <stdio.h>

#define MAXN 10

double f(int n, double a[], double x);

int main()
{
	int n, i;
	double a[MAXN], x;

	scanf_s("%d %lf", &n, &x);
	for (i = 0; i <= n; i++)
		scanf_s("%lf", &a[i]);
	printf("%.1f\n", f(n, a, x));
	return 0;
}

double f(int n, double a[], double x) {
	double res = a[0];
	double X = 1;
	for (int i = 1; i <= n; i++) {
		X *= x;
		res += a[i] * X;
	}
	return res;
}