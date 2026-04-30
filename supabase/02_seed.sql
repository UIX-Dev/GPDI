-- =====================================================
-- GPDI 콘텐츠 시드 — 기존 51 보도자료 + 17 교육영상
-- 1회만 실행. 빈 테이블 가정.
-- =====================================================

-- 보도자료 (newest first, idx 51 → 1)
insert into public.press_releases (title, url, published_at) values
('프로파일럿(방송) 한국방위산업 2026-2', 'https://www.youtube.com/watch?v=PjYmgTeRGJ0', '2026-02-04'),
('프로파일럿(방송) 한국방위산업 2026-1', 'https://www.youtube.com/watch?v=1zRGcBkVmk4', '2026-02-04'),
('(컬럼) Post-Davos recalibration: From intelligent collaboration to fragmented dialogue [Korea Herald]', 'https://www.koreaherald.com/article/10667185', '2026-02-04'),
('(컬럼) Korea''s strategic UN positioning [Korea Herald]', 'https://www.koreaherald.com/article/10657743', '2026-02-04'),
('(컬럼) Korea''s EU market growth strategy [Korea Herald]', 'https://www.koreaherald.com/article/10650924', '2026-02-04'),
('(컬럼) Korea''s US security strategy test [Korea Herald]', 'https://www.koreaherald.com/article/10638671', '2026-02-04'),
('(컬럼) Korea at a crossroads: Innovation, demographics and the global diaspora [Korea Herald]', 'https://www.koreaherald.com/article/10626536', '2026-02-04'),
('(컬럼) Korea Herald: RDP MOU — The missing link in the Korea-US defense alliance', 'https://www.koreaherald.com/article/10602456', '2026-02-03'),
('"한국 조선업은 美 해군 전력 강화 최적 파트너…수리·정비 분야부터 실적 쌓아가야" [매일경제]', 'https://www.mk.co.kr/news/economy/11326526', '2025-05-29'),
('''K-방산 브리프'' 출판 기념 세미나·북콘서트 열려… K-방산 미래전략에 대한 심도 깊은 논의 [뉴스로드]', 'https://www.newsroad.co.kr/news/articleView.html?idxno=38613', '2025-04-25'),
('[기고] 우크라 재건 사업, 한국 기업엔 기회 [매일경제]', 'https://www.mk.co.kr/news/contributors/11278988', '2025-04-21'),
('[시론] ''관세 폭풍'' 돌파구, 美 공공조달 시장 [한경 오피니언]', 'https://www.hankyung.com/article/2025041534031', '2025-04-21'),
('[K-방산 브리프②] 미국 국가 방위산업 전략(NDIS)과 한국 방위산업 대미수출 전략 [뉴스로드]', 'https://www.newsroad.co.kr/news/articleView.html?idxno=37730', '2025-04-03'),
('KAIST, 글로벌 공공 조달 전문가 양성 교육 과정 운영 [한국경제TV]', 'https://n.news.naver.com/mnews/article/215/0001202472', '2025-03-20'),
('[뉴10⑥] ''국산화가 1등 공신''…세계 4대 방산수출국 목표 [MBN뉴스]', 'https://n.news.naver.com/article/057/0001875129', '2025-03-20'),
('방사청-KAIST, 방위산업 수출 전문가 과정 수료식 성료 [한국경제TV]', 'https://n.news.naver.com/mnews/article/215/0001189272', '2024-11-27'),
('대동, 1조원 규모 우크라이나 농기계 시장 진출 [한국경제]', 'https://www.hankyung.com/article/2024112155685', '2024-11-22'),
('트럼프 "美무기고 텅 비었다"… K방산 ''1000조 시장'' 기회 [동아일보]', 'https://www.donga.com/news/Inter/article/all/20241112/130407456/2', '2024-11-13'),
('[편집장 인터뷰] 김만기 KAIST 교수, "방산 수출 지속하려면 국내 방산기업이 국제입찰에서 수주 능력을…" [뉴스투데이]', 'https://www.news2day.co.kr/article/20241009500020', '2024-10-10'),
('[2024 K-방산혁신포럼 (8)] 김만기 KAIST교수 "미국처럼 중소기업 참여 늘려 공정성과 경쟁력…" [뉴스투데이]', 'https://www.news2day.co.kr/article/20240822500182', '2024-09-24'),
('김만기 KAIST교수 ''한미 RDP 체결 이후 준비 위해 교육·전문가 육성해야'' [뉴스로드]', 'https://www.newsroad.co.kr/news/articleView.html?idxno=29248', '2024-05-31'),
('[기고] K-방산의 지속 가능성과 대미 수출 [한국일보]', 'https://m.hankookilbo.com/News/Read/A2024031311190004671', '2024-03-26'),
('''540조원 美 국방 조달시장은 기회의 場…한국 기업 위해 1600쪽 규정집 번역했죠'' [한국경제]', 'https://www.hankyung.com/article/2023090428891', '2023-09-05'),
('무역협회, ''우크라이나 현지사업 정보'' 정기 배포 [연합뉴스]', 'https://n.news.naver.com/article/001/0014168994?sid=104', '2023-09-05'),
('[2023 2분기 해외건설저널] 김만기 — 국제기구를 통한 우크라이나 전후복구사업 참여전략', null, '2023-07-25'),
('우크라 재건은 ''제2 마셜플랜''… 韓, 신도시 경험 살려 기회 잡아야 [매일경제]', 'https://www.mk.co.kr/news/world/10652420', '2023-04-13'),
('[사설] 우크라이나 재건사업, 해외건설 새로운 기회 오나 [대한경제]', 'https://www.dnews.co.kr/uhtml/view.jsp?idxno=202302151623451940321', '2023-04-13'),
('국내 보건산업체, 美 매사추세츠 주정부 공급 기회 열려 [메디포뉴스]', 'https://www.medifonews.com/news/article.html?no=175410', '2023-04-13'),
('KAIST, 16개 혁신기업 미국 900억 규모 조달시장 진출 지원 [연합뉴스]', 'https://www.yna.co.kr/view/AKR20230209065000063', '2023-04-13'),
('세계 명품 K-방산, 이제는 미국 시장 두드린다 [경남도민신문]', 'http://www.gndomin.com/news/articleView.html?idxno=325228', '2022-09-02'),
('한국방위산업연구소, 국회 방위산업 특별 정책세미나 개최 [뉴스투데이]', 'https://www.news2day.co.kr/article/20220824500244', '2022-09-02'),
('[기고] 누리호 다음은 뭘 해야 할까 [매일경제]', 'https://n.news.naver.com/article/009/0004999670', '2022-08-12'),
('[방산 이슈 진단 (67)] 한미 상호국방조달협정(RDP-MOU) 체결 속도조절론 대두, 상호주의 함정 피해야 [뉴스투데이]', 'https://www.news2day.co.kr/article/20220413500108', '2022-07-18'),
('''K방산 날개 확 펴려면 한미 국방조달협정 시급'' [매일경제]', 'https://www.mk.co.kr/news/business/view/2022/03/273824/', '2022-07-18'),
('한국방위산업학회, 한미 방산동맹 관련 정책세미나 개최 [뉴스투데이]', 'https://www.news2day.co.kr/article/20220325500007', '2022-07-18'),
('이광형 KAIST 총장 ''뇌질환 예방 산학연''…아이메디신과 협약 [머니투데이]', 'https://news.mt.co.kr/mtview.php?no=2022032411432461934', '2022-07-18'),
('KAIST 경영대학 제8기 IGMP 오픈 [대한경제]', 'https://m.dnews.co.kr/m_home/view.jsp?idxno=202203080958095940398', '2022-07-18'),
('[시론] 한·미 ''방산 분야 FTA'' 체결 시급하다 [한국경제]', 'https://www.hankyung.com/opinion/article/2022022214301', '2022-07-18'),
('카이스트 경영대학, 제1회 글로벌공공조달포럼 성료 [대한경제]', 'https://www.dnews.co.kr/uhtml/view.jsp?idxno=202202102301581890659', '2022-07-18'),
('김만기 KAIST 교수 ''700조원 美 공공조달 시장, 韓기업 진출 돕고 싶었죠'' [한국경제]', 'https://www.hankyung.com/economy/article/2022020639601', '2022-07-18'),
('''스타트업, 기회의 땅 해외조달시장 뚫어야…미국만 753조원'' [머니투데이]', 'https://news.mt.co.kr/mtview.php?no=2021072717264995548', '2022-07-18'),
('2020 e-B2G 진출지원사업 참여기업 간담회 [한국경제]', 'https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=202106241513a', '2022-07-18'),
('베스티안재단 ''5회 의료기기 혁신세미나'' 비대면 개최 [충북일보]', 'https://www.inews365.com/news/article.html?no=665072', '2022-07-18'),
('중기부·중진공, 해외 조달시장 진출 기업들에 ON택트 강연 제공 [한국경제]', 'https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=202012244805i', '2022-07-18'),
('김만기 KAIST 교수 ''코로나 경제위기, 유엔 조달시장이 돌파구'' [한국경제]', 'https://www.hankyung.com/society/article/2020110910031', '2022-07-18'),
('씨젠, 유니세프와 코로나19 진단키트 장기 공급계약 체결 [한국경제]', 'https://www.wowtv.co.kr/NewsCenter/News/Read?articleId=202009288638i', '2022-07-18'),
('신신제약, ''업계 최초'' 15조원 규모 美 정부 조달시장 진출 [동아일보]', 'https://www.donga.com/news/article/all/20200316/100186830/1', '2022-07-18'),
('방위사업, 4차 산업혁명 ''마중물'' 돼야 [국방일보]', 'https://kookbang.dema.mil.kr/newsWeb/20190318/3/BBSMSTR_000000010027/view.do', '2022-07-07'),
('55조원 규모의 해외 조달시장 진출을 위한 설명회 개최 [부산경제진흥원]', 'https://blog.naver.com/bepa_sns/221460255833', '2022-07-07'),
('[해외조달시장 탐구생활] 해외조달시장은 기회의 땅! 2018 공공조달 수출상담회 참가', 'https://blog.naver.com/ppspr/221413688697', '2022-07-07'),
('[기고] 美와 ''방산 분야 FTA'' 맺어 수출 길 열어야 [매일경제]', 'https://www.mk.co.kr/opinion/contributors/view/2018/08/525168/', '2022-07-07');

-- 교육영상 (newest first, idx 26 → 7)
insert into public.education_videos (title, youtube_id, external_url, published_at) values
('[메인비즈협회 MAINBIZ] 제117회 굿모닝CEO학습 (김만기 KAIST 교수)', 'o5IVsgZY4GM', null, '2022-09-29'),
('해외조달시장 진출 온라인 설명회: 국제기구 조달시장 진출 전략', null, 'https://www.gpdi.kr/sub/sub03_04.php?mNum=3&sNum=4&boardid=video&mode=view&idx=24', '2022-09-27'),
('新 정부의 방위산업 추진정책 기조와 방산수출 성과 및 전망', null, 'https://www.gpdi.kr/sub/sub03_04.php?mNum=3&sNum=4&boardid=video&mode=view&idx=23', '2022-09-27'),
('제32회 한국방위산업학회 정책세미나 (주제발표: 김만기 KAIST 교수, 장원준 산업연구원 연구위원)', 'l9HMFC_5LS4', null, '2022-09-27'),
('[Star-mooc] MOOC 강좌', null, 'https://www.gpdi.kr/sub/sub03_04.php?mNum=3&sNum=4&boardid=video&mode=view&idx=20', '2022-07-18'),
('[K-방역 온라인 나라장터 엑스포] 국문)세션4_①미국 조달시장 설명회 — 김만기 교수', 'WuGUYz3uXQs', null, '2022-07-18'),
('[K-방역 온라인 나라장터 엑스포] 국문)세션3_①UN 조달시장 설명회 — 김만기 교수', 'dw4hhceuopE', null, '2022-07-18'),
('[KAIST IGMP] Policy Design Support for Public Procurement for SMEs and Innovation in Costa Rica', '3AglLzQ8iao', null, '2022-07-18'),
('[KAIST IGMP] KAIST IGMP (국제입찰 & 공공조달 관리과정) 4기 수료식 동영상', 'hsAqW8fshbs', null, '2022-07-18'),
('[KAIST IGMP] Global Public Procurement by Prof. Man Ki Kim — KAIST College of Business (Coursera)', 'XcZQtO_pAbY', null, '2022-07-18'),
('[TRADE ON] ''수출을 잇-다 Connect on'' #1 UN 공공조달(1)', null, 'https://www.gpdi.kr/sub/sub03_04.php?mNum=3&sNum=4&boardid=video&mode=view&idx=13', '2022-07-18'),
('[KAIST IGMP] 유엔조달 특별좌담회 -1/3 — 김만기 카이스트 경영대학 (IGMP)', 'MzmDV2DrYLE', null, '2022-07-18'),
('[KAIST IGMP] KAIST 글로벌 공공조달 과정 KOOC 홍보영상 — 김만기 교수', '0WHGXBr1HBs', null, '2022-07-18'),
('[KAIST IGMP] KAIST 국제입찰 & 해외공공조달 관리과정(IGMP) 홍보 영상', 'znqoIz30GOA', null, '2022-07-18'),
('[KAIST IGMP] KAIST 국제입찰 & 해외공공조달 관리과정(IGMP) 4기 사전 설명회', '40pjQLfebbk', null, '2022-07-18'),
('[조달청 TV] UN 조달시장 설명회 — 김만기 교수 / 2020 온라인 나라장터 엑스포', '2PXkyqqS88A', null, '2022-07-18'),
('[조달청 TV] 미국 조달시장 설명회 — 김만기 교수 / 2020 온라인 나라장터 엑스포', 'L2yMSuH5x48', null, '2022-07-18');

-- 검증 (둘 다 51, 17이 나오면 성공)
select count(*) as press_count from public.press_releases;
select count(*) as video_count from public.education_videos;
