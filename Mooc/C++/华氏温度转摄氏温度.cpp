// 一个C++程序实例：将摄氏温度换算成华氏温度
#include <iostream>
using namespace std;
int main()
{
    double ctemp, ftemp;  // 申请内存空间
    cin >> ftemp;         // 从键盘输入摄氏温度
    ctemp = (ftemp - 32) / 1.8;
    cout << ctemp;        // 在显示器上输出华氏温度
    return 0;             // 程序结束，退出
}
