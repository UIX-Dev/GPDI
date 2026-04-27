# GPDI Web — Claude 작업 지침

글로벌조달개발원(Global Procurement Development Institute) 공식 웹사이트 프로젝트.

## 프로젝트 개요

- **운영 URL**: https://uix-dev.github.io/GPDI/ (GitHub Pages)
- **저장소**: https://github.com/UIX-Dev/GPDI
- **스택**: Vanilla HTML / CSS / JS (빌드 도구 없음)
- **폰트**: Noto Sans KR + Inter + JetBrains Mono (AI 페이지만)
- **배포 방식**: `main` 브랜치 push → GitHub Actions 자동 배포 (1~2분)

## 페이지 구조 (9개 활성 페이지)

```
index.html           메인
├── about.html       해외공공조달
├── history.html     히스토리 (지그재그 타임라인)
├── members.html     해외 공공조달 전문가 (탭: 김만기 교수 / 이미정 원장)
├── work.html        사업 분야 (탭: 주요 실적 / 서비스 소개)
├── healthcare.html  헬스케어 (KOFIH · KOICA · 조달청 · 보건복지부)
├── smartcity.html   스마트시티 (Smart House · Mobility · Finance)
├── ai.html          AI 전환 (AX · DX · SI — 신사업)
├── gpdi-usa.html    GPDI USA
├── gpdi-uae.html    GPDI UAE
└── gpdi-ukraine.html  GPDI Ukraine
```

## 브랜드 색상 팔레트 (로고 추출)

- `#535470` Slate Blue — 주요 헤딩·네비 강조
- `#86acaa` Sage Teal — 서브 액센트·링크·eyebrow 라인
- `#b87860` Terracotta — 경고·포인트·CTA
- `#3e3a39` Charcoal — 본문 텍스트
- `#595857` Ash — 보조 텍스트
- `#1f2a4a` Navy Dark — AI 페이지 타이틀·Hook 배경
- `#faf9f6` Off-white — 보조 배경

## 파일 네이밍 · 버전 규칙

**중요 — 사용자의 전역 규칙**
- 파일은 **절대 삭제하지 말고 `_백업/` 폴더에 보관**
- 버전 스냅샷은 `_백업/버전/` 으로 이동
- 참고 문서는 `_백업/문서/`
- 원본 이미지는 `_백업/이미지/`

`_백업/` 폴더는 `.gitignore`로 제외되어 GitHub에는 올라가지 않습니다.

## 공용 컴포넌트

### 헤더 (모든 페이지 동일)
- 로고: `images/GPDI_LOGO_white.svg` (히어로 어두운 배경용)
- GNB 5개 메뉴: 회사 소개 / 사업 분야 / 헬스케어 / 스마트시티 / AI 전환
- 언어 토글: KOR / ENG (`js/lang.js`)
- 현재 페이지 하이라이트: `<li class="is-current">` 클래스 사용

### 푸터 (모든 페이지 동일)
- 클래스 prefix: `gp-footer`
- 배경: `#3a3f4a`
- 구조: `.gp-footer__links` (상단 유틸) + `.gp-footer__info` (메인 인포)

### 언어 토글 규칙
- `body[data-lang="ko|en"]` 속성으로 제어
- 텍스트 래핑: `<span class="t-ko">한글</span><span class="t-en">English</span>`
- `js/lang.js`가 localStorage("gpdi-lang")에 저장

## 서브메뉴 앵커 규칙

각 페이지의 하위 섹션에 id를 붙여 GNB 서브메뉴에서 점프:

| 페이지 | 앵커 prefix | 섹션 예시 |
|---|---|---|
| work.html | `#tab-*` | `#tab-performance`, `#tab-services` |
| healthcare.html | `#hc-*` | `#hc-expertise`, `#hc-partners`, `#hc-performance`, `#hc-methodology` |
| smartcity.html | `#sc-*` | `#sc-focus`, `#sc-approach`, `#sc-process`, `#sc-proof` |
| ai.html | `#ax-*` | `#ax-services`, `#ax-stack`, `#ax-process`, `#ax-why` |

## 이미지 경로

- `images/GPDI_LOGO.svg` · `GPDI_LOGO_white.svg` · `GPDI_Symbol.svg`
- `images/about/` — 국기 (info06_01_country01~04.png), 멤버 사진 (member_kim_2026.png, member_lee_2026.png)
- `images/main/` — 배너, 월드맵, 아이콘
- `images/common/` · `images/sub/` — 기타

## 작업 관례

1. **HTML 수정 시**: 같은 구조·스타일 패턴을 다른 페이지에도 적용 (일관성)
2. **네비게이션 변경 시**: 10개 HTML 파일 전체 일괄 수정 필요 (Python 스크립트 활용)
3. **공개하면 안 되는 정보**:
   - 구체적인 프로젝트명 (예: 태국 람차방, 솔라시도, 세종 5-1) — 카테고리로 일반화
   - 파트너사 실명 (예: Frey Group, 씨젠) — "유럽 개발사", "진단 전문기업" 등으로
   - 제안서 PDF·내부 문서는 `_백업/문서/` 보관 (절대 공개 안 됨)
4. **새 페이지 추가 시**: 10개 HTML 전부의 GNB에 해당 링크 추가 (index.html은 `t-ko/t-en` 2개국어 구조)

## Git 워크플로우

```bash
git add .
git commit -m "수정 내용"
git push
# 1~2분 후 gh-pages 자동 배포
```

- `user.email`: dev.cununa@gmail.com
- `user.name`: Kelly
- 줄바꿈 정책: `.gitattributes`에 `* text=auto eol=lf` (저장소는 LF로 통일)

## 현재 진행 상황 (2026-04-22 기준)

- [x] 9개 활성 페이지 전부 구축 완료
- [x] GitHub Pages 배포 중 (public repo)
- [x] 김만기 대표 / 이미정 원장 프로필 (탭 전환)
- [x] 히스토리 타임라인 (2017~2026)
- [x] work.html Performance/Services 탭 UI
- [x] healthcare.html (KOFIH 베트남 의료기기 디지털전환 형성조사 진행 중)
- [x] smartcity.html (일반화된 레퍼런스)
- [x] ai.html (신사업 — AX/DX/SI 해결사 포지셔닝)
- [ ] sub/pop_privacy.html · pop_email.html — 기본 스텁만 있음, 정식 문구 필요
- [ ] 다국어 영문(ENG) 번역 — 인프라만 있고 컨텐츠 미번역
