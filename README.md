# GPDI Web

글로벌조달개발원(Global Procurement Development Institute) 공식 웹사이트.

- 운영 URL: <https://gpdi.kr> (`www.gpdi.kr` → 301 리다이렉트)
- 빌드 도구 없음, 데이터베이스 없음. 모든 콘텐츠가 HTML 안에 있다.
- 작업 지침과 상세 규칙은 [CLAUDE.md](./CLAUDE.md) 참조.

## 구조

```
GPDI/
├── index.html              # 메인
│
├── 전략 자문
│   ├── about.html          # 해외공공조달
│   ├── members.html        # 해외 공공조달 전문가
│   │                       #   (김만기 대표 고문 · 이미정 대표 원장)
│   ├── history.html        # 히스토리
│   └── organization.html   # 조직도 (대표 이민경)
│
├── 글로벌 사업
│   ├── work.html           # 사업 분야
│   ├── performance.html    # 주요 실적
│   ├── services.html       # 서비스 소개
│   ├── gpdi-usa.html       # GPDI USA
│   ├── gpdi-uae.html       # GPDI UAE
│   └── gpdi-ukraine.html   # GPDI Ukraine
│
├── 산업 솔루션
│   ├── healthcare.html     # 헬스케어
│   ├── smartcity.html      # 스마트시티
│   └── defense.html        # 국방안전
│
├── ai.html                 # AI 전환 (AX·DX / ICT·인프라)
├── contact.html            # 문의·위치
│
├── press.html              # 보도자료 51건 (메인에서만 진입)
├── education.html          # 교육영상 17건 (메인에서만 진입)
│
├── sub/                    # 푸터 팝업 (개인정보처리방침 · 이메일무단수집거부)
├── images/                 # 사이트 에셋 (about · agencies · main)
├── js/
│   └── lang.js             # KOR/ENG 언어 토글
└── supabase/               # 아카이브 — 사이트에서 참조하지 않음
```

`*_04_27.html` · `*_06_05.html` 은 당시 상태 보존용 날짜 스냅샷이며 어디서도 링크되지 않는다.

## 콘텐츠 수정

보도자료·교육영상은 DB가 아니라 HTML이 원본이다. 2026-08-06에 Supabase 의존을
제거했다.

| 대상 | 위치 |
|---|---|
| 보도자료 전체 | `press.html` 의 `#pp-list` |
| 교육영상 전체 | `education.html` 의 `#ed-grid` |
| 메인 보도자료 12건 | `index.html` 의 `#landing-press-list` |
| 메인 교육영상 6건 | `index.html` 의 `#landing-video-list` |

해당 `<ul>` 안에 `<li>` 를 직접 추가한다. 정렬은 최신순(같은 날짜면 나중 등록이 위).
전체 목록과 메인 목록은 별개이므로 메인에도 노출하려면 두 곳 모두 넣는다.

## 스택

- Vanilla HTML / CSS / JS (no build step)
- Google Fonts: Noto Sans KR, Inter, JetBrains Mono(AI 페이지)
- 임베드: Google Maps
- 헤더·푸터·모바일 드로어는 페이지마다 복제되어 있어, 공용 요소를 바꾸려면
  활성 18개 HTML을 일괄 수정해야 한다.

## 로컬 개발

`index.html`을 브라우저로 열거나 로컬 서버 실행:

```bash
python3 -m http.server 8080
# or
npx serve .
```

## 배포

GitHub Pages — `main` 브랜치 루트에서 서빙. push하면 `pages build and deployment`
워크플로가 자동으로 돌고 보통 40초~2분 내 반영된다.

---

© 2022 Global Procurement Development Institute. All rights reserved.
