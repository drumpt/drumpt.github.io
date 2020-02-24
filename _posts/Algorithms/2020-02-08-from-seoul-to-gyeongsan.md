---
layout: post
title: BOJ 서울에서 경산까지
categories: [Algorithms]
tags: [DP, full search]
comments: true
---

## [문제](https://www.acmicpc.net/problem/14863){: target="_blank"}
배우 한정올 씨는 이번 여름에 서울에서 경산까지 자선 여행을 하면서 모금 활동을 진행할 계획이다. 자선 여행에서 거쳐 가게 될 도시의 개수와 순서는 미리 정해져 있으며, 자선 여행은 서울에서 시작하여 각 도시를 정해진 순서대로 단 한 번씩 방문한 후 경산에서 끝난다. 서울을 제외한 도시의 개수를 N 이라 하자. 이때 서울에서 두 번째 도시까지 가는 구간을 구간 1, 두 번째 도시부터 세 번째 도시까지 가는 구간을 구간 2와 같이 부르기로 하며, 마지막 목적지인 경산에 도착하는 구간을 구간 N 이라 하자. 즉, 구간의 전체 개수는 N이다. 구간 사이의 이동은 도보 혹은 자전거 어느 한 쪽을 이용하게 되는데, 각 구간에는 도보로 이동할 때 걸리는 시간(분), 이때 얻게 되는 모금액(원), 자전거로 이동할 때 걸리는 시간(분), 이때 얻게 되는 모금액(원)이 정해져 있다.

예를 들어, 서울과 경산 사이에 2개의 도시가 있는 다음과 같은 경우(N = 3)를 생각해 보자.  
<div align="center">
<div markdown="1">
![Problem Image](/img/posts/from-seoul-to-gyeongsan-1.png)  
</div>
</div>
인접한 도시 사이를 도보로 이동하는지 자전거로 이동하는지에 따라 전체 모금액이나 걸리는 시간에 차이가 생기게 된다. 한정올 씨는 전체 모금액을 가능한 많이 얻는 방법을 찾고 싶어 한다. 위의 예에서는 시간이 충분하다면 모든 구간을 도보로 이동하는 것이 모금액을 최대로 하는 방법이며, 모금액은 200+370+250 = 820원, 여행에 걸리는 시간은 500+800+700 = 2,000분이다.

그러나 한정올 씨는 바쁜 스케줄로 인해 자선 여행을 위해 보낼 수 있는 시간이 K분(K는 자연수)으로 한정되어 있다. 위의 예에서 만약 K = 1,650이라면, 1, 2번 구간은 도보로 이동하고 3번 구간은 자전거로 이동하여 모금액을 660원으로 하는 것이 가장 좋은 방법이며, 이때 걸리는 시간은 1,600분이다.

위와 같이 각 구간별로 도보 및 자전거로 이동하는 경우 걸리는 시간과 모금액이 주어질 때, 제한시간 이내로 서울에서 경산까지 여행하면서 모금할 수 있는 최대 금액을 찾는 프로그램을 작성하시오. (제한시간 이내에 여행하는 방법은 항상 존재한다.)

## 풀이
처음에는 재귀함수를 이용해 모든 경우의 수를 고려하여 문제를 해결하려 했다. 이 경우 $$O(2^N)$$의 시간 복잡도로 문제를 해결할 수 있으나, 시간 복잡도가 너무 커 어떻게 하면 시간 복잡도를 줄일 수 있을지 생각했다. 예제를 확인한 후 직관적으로 모든 구간에서 도보로 이동하는 것보다 자전거로 이동하는 것이 빠르지만, 모이는 모금액은 적을 것이라 생각했다. 제한시간이 존재하므로 모든 구간을 자전거로 간다고 가정한 후 도보로 이동하는 구간의 갯수를 점점 늘려가며 가장 많은 모금액이 모이는 조합을 찾으면 될 것이라 생각했다.  

하지만 이를 코드로 구현하는 데 어려움을 겪었고, 결국 예제 코드를 참고하게 되었다. 예제 코드에서는 모든 경우의 수를 고려하지만 memoization 기법을 이용해 시간 복잡도를 최적화하는 것을 확인할 수 있었다. 이 경우 $$O(NK)$$의 시간 복잡도로 문제를 해결할 수 있었다. 아래는 제한시간 내에 문제를 해결할 수 있는 풀이이다.  

maxMoney[i][j]를 구간 1 ~ i까지 가는 데 걸린 시간이 j일 때 모금할 수 있는 최대 금액이라고 하고 walkTime[i], bikeTime[i]를 구간 i를 통과할 때 도보, 자전거로 걸리는 시각, walkMoney[i], bikeTime[i]를 구간 i를 통과할 때 도보, 자전거로 모금할 수 있는 금액이라고 한다면 아래와 같은 점화식을 만족한다.
```cpp
maxMoney[i][j + walkTime[i]] = max(maxMoney[i][j + walkTime[i]], maxMoney[i - 1][j] + walkMoney[i]);
maxMoney[i][j + bikeTime[i]] = max(maxMoney[i][j + bikeTime[i]], maxMoney[i - 1][j] + bikeMoney[i]);
```
이 때 max값을 취해주는 이유는 도보와 자전거를 고려한 서로 다른 경우의 수에서 똑같은 시각이지만 다른 모금액이 나타날 수 있기 때문이다. 예를 들어 총 두 개의 구간이 존재하고 walkTime = {500, 200}, bikeTime = {200, 500}, walkMoney = {200, 100}, bikeMoney = {370, 120}이라고 한다면 (구간 1, 구간 2) = (도보, 자전거)와 (자전거, 도보)에서 걸리는 시간이 동일하지만 계산 순서에 따라 모금액이 더 작은 경우가 늦게 계산될 수 있고, 그렇다면 maxMoney의 정의를 만족시키지 않게 된다. 이러한 경우를 고려하여 max값을 취해주게 되었다. 위의 점화식을 이용하여 문제를 해결할 수 있었다. 전체 소스 코드는 아래와 같다.

## 소스 코드
```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> maxMoney(101, vector<int>(100001, 0));
vector<int> walkTime(101, 0);
vector<int> walkMoney(101, 0);
vector<int> bikeTime(101, 0);
vector<int> bikeMoney(101, 0);
int N, K;

int main(void) {
	cin >> N >> K;
	for (int i = 1; i <= N; i++) {
		cin >> walkTime[i] >> walkMoney[i] >> bikeTime[i] >> bikeMoney[i];
	}
	maxMoney[1][walkTime[1]] = walkMoney[1];
	maxMoney[1][bikeTime[1]] = max(maxMoney[1][bikeTime[1]], bikeMoney[1]);
	for (int i = 2; i <= N; i++) {
		for (int j = 0; j <= K; j++) {
			if (maxMoney[i - 1][j] == 0) continue;
			if (j + walkTime[i] <= K) {
				maxMoney[i][j + walkTime[i]] = max(maxMoney[i][j + walkTime[i]], maxMoney[i - 1][j] + walkMoney[i]);
			}
			if (j + bikeTime[i] <= K) {
				maxMoney[i][j + bikeTime[i]] = max(maxMoney[i][j + bikeTime[i]], maxMoney[i - 1][j] + bikeMoney[i]);
			}
		}
	}
	int answer = -1;
	for (int i = 0; i <= K; i++) {
		answer = max(answer, maxMoney[N][i]);
	}
	cout << answer;
	return 0;
}
```

## 피드백
직관적으로 모든 구간에서 도보로 이동하는 것보다 자전거로 이동하는 것이 빠르지만, 모이는 모금액은 적을 것이라 생각했다. 하지만 이는 잘못된 직관이었다. 실제로 도보로 이동하는 시간과 자전거로 이동하는 시간이 같은 테스트케이스가 존재했다.  
처음에 생각했던 아이디어를 구현하지 못했던 이유가 여러 수가 있을때 이들의 순열을 제대로 계산하여 출력하는 방법을 제대로 모르는 것에 있었음을 깨달았고, 이를 출력하는 예제를 직접 구현해야겠다는 생각을 했다.
