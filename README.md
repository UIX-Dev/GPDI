# GPDI Web

글로벌조달개발원(Global Procurement Development Institute) 공식 웹사이트.

## 구조

```
GPDI_Web/
├── index.html              # 메인
├── about.html              # 해외공공조달
├── history.html            # 히스토리
├── members.html            # 해외 공공조달 전문가 (김만기 대표 · 이미정 원장)
├── work.html               # 사업 분야 (주요 실적 · 서비스 소개)
├── healthcare.html         # 헬스케어
├── gpdi-usa.html           # GPDI USA
├── gpdi-uae.html           # GPDI UAE
├── gpdi-ukraine.html       # GPDI Ukraine
├── sub/                    # 푸터 팝업 (개인정보처리방침 · 이메일무단수집거부)
├── images/                 # 사이트 에셋 (로고 · 국기 · 멤버 사진 등)
└── js/
    └── lang.js             # KOR/ENG 언어 토글
```

## 스택

- Vanilla HTML / CSS / JS (no build step)
- Google Fonts: Noto Sans KR, Inter
- 임베드: Google Maps

## 로컬 개발

`index.html`을 브라우저로 열거나 로컬 서버 실행:

```bash
python3 -m http.server 8080
# or
npx serve .
```

## 배포

GitHub Pages — `main` 브랜치 루트에서 서빙. 퍼블리싱 URL: `https://uix-dev.github.io/GPDI/`

---

© 2022 Global Procurement Development Institute. All rights reserved.
