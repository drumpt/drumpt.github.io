---
layout: post
title: To do lists for jekyll blog
categories: [Extra]
tags: [jekyll-blog]
comments: true
---

# 200208(토) 한 일
1. 카테고리 구분
	- Post
		- Algorithms
		- Machine Learning
		- Extra  
		- Tests(default posts :: 참고용)
	- Projects
		- Immersion Camp Week1
		- Immersion Camp Week2
		- Immersion Camp Week3
		- Immersion Camp Week4
		- AI World Cup Code Generator
	- Tags
1. 카테고리별로 그 카테고리에 해당하는 게시물들만 보여줄 수 있도록 layout 설정 완료
1. Add Lab. Experience

# 200223(일) 한 일
1. posts 본문 글꼴 변경
	- css/main.css에 존재하는 body의 font-family에 나눔고딕을 추가하고 import하여 완료. import를 제대로 하니 잘 된다.
	- GitHub에 push하면 글꼴이 바뀌는 문제 발생.. 시간을 두고 확인하자.
	- 문제의 원인을 찾은 것 같다. body font의 경우 web browser의 default font에 의해 결정되기 때문에 어쩔 수 없게 되는 것. 이는 다른 블로그에 들어가서 확인했다. 결국 body의 font-fmaily에 나눔고딕을 추가하는 것보다 더 많은 것을 할 수 없는 것 같다.
1. Tags category가 필요할까? 쉽게 넣을 수 있을 것 같긴 한데..
	- _config.yml 파일의 navbar-links에 Tags 추가 완료
1. Find markdown editor and local build system(build와 preview가 가능하면 좋을 것 같다)
	- [블로그](https://shryu8902.github.io/jekyll/jekyll-on-windows){: target="_blank"}를 참고하여 local build system을 구축하고, vscode에서 제공하는 Sync Markdown Preview 기능을 이용해 preview가 가능한 것을 확인. customized css가 적용되지 않아 아쉬움. 이럴 때는 build해야 함.
	- build시 한글 디렉토리를 인식하지 못하는 문제 발생
		- 방법 1 : C 드라이브에 복제 폴더를 만들고, 빌드하고싶을 때마다 Microsoft SyncToy 프로그램을 실행시켜 복제 폴더를 동기화 후 빌드.
		- 방법 2 : 한글 디렉토리를 인식할 수 있게 만드는 것.
		- 방법 3 : C 드라이브로 원래 폴더 자체를 옮기는 것.
		- **해결 : 방법 2를 시도하다 잘 되지 않아 방법 3을 통해 해결함.**
1. Repository 내의 category, post 디렉토리들도 계층화할 수 있으면 좋을 것 같다.
	- category 디렉토리는 계층화가 안되는 것 같고, post 디렉토리는 가능한 것 같다. post 디렉토리 계층화 완료.
1. SNS 계정 추가
	- github 계정 추가 완료. facebook과 instagram의 경우에는 보안상의 문제로 추가하지 않음.
1. 서울에서 경산까지 풀이 업로드
	- MathJax를 이용해 markdown에 수식 입력 가능하게 함.
	- 업로드 완료.

# 200224(월) 한 일
1. 블로그를 검색 가능하게 만들기
	- 구글 사이트맵 등록을 이용해 게시물들을 구글에서 검색 가능하게 함. 
	- 추후 BOJ 서울에서 경산까지를 입력하여 제대로 되었는지 확인하면 될 듯.
	- BOJ 서울에서 경산까지, To do lists for jekyll blog로 검색되는 것 확인. 다만 BOJ의 경우에는 블로그 이름으로 검색되었음.
	- 네이버와 다음의 경우에도 비슷한 방법으로 검색되게 할 수 있는 것을 확인. 추후 필요성을 느끼면 구현할 예정.
1. 댓글 기능 추가하기
	- disqus를 이용하여 구현 완료.
1. favicon 추가
	- head.html에 추가하여 완료.

# 200227(목) 한 일
1. 매드캠프 프로젝트 카테고리를 만들어 디렉토리를 하나로 합침. 추후에 포스트들을 추가할 예정.

# 200913(일) 한 일
1. Design customizing
	- 아이디어 1 : 상단, 하단 배경색을 진하게 바꾸고 글씨를 흰 색으로 바꾸기만 해도 크게 예뻐질 것 같다.
		- 완료.
	- 아이디어 2 : 포스트의 제목과 단락 사이의 간격을 적절하게 조정하고, 댓글창, 태그창 등등 사이에 선을 넣으면 좋을 것 같다.
		- 포스트의 제목과 단락 사이의 간격을 늘림.
		- 선을 넣어보았으나 별로인 것 같아서 뺐음.

# 앞으로 해야할 일
1. Projects category 정리하기 + github repository에도 추가하기
1. 모든 posts 말고 다른 category에서도 좌우로 넘길 수 있게 만들기
	- jekyll-paginate-v2를 이용하여 카테고리별로 posts를 넘길 수 있을 것 같다.
1. 카테고리별로 previous, next post에 그 카테고리에 해당하는 post만 포함되게
	- 기본적으로 하나의 post는 하나의 category에만 속하는 것으로 가정.
	- 시도했으나 쉽지는 않음. post.html에서 previous page와 next page를 정의한다면 index.html에서 왔는지, category.html에서 왔는지를 구분할 수 없기 때문.