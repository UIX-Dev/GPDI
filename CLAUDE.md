# GPDI Web — Claude 작업 지침

글로벌조달개발원(Global Procurement Development Institute) 공식 웹사이트 프로젝트.

## 프로젝트 개요

- **운영 URL**: https://gpdi.kr (커스텀 도메인, `CNAME` 파일로 설정)
  - `https://www.gpdi.kr` → `gpdi.kr` 301 리다이렉트
  - GitHub Pages 기본 주소 `https://uix-dev.github.io/GPDI/` 도 같은 내용을 서빙
- **저장소**: https://github.com/UIX-Dev/GPDI
- **스택**: Vanilla HTML / CSS / JS (빌드 도구 없음, **데이터베이스 없음**)
- **폰트**: Noto Sans KR + Inter + JetBrains Mono (AI 페이지만)
- **배포 방식**: `main` 브랜치 push → GitHub Actions 자동 배포 (약 40초~2분)

**서버·DB가 없다.** 모든 콘텐츠는 HTML 파일 안에 있다. 2026-08-06에 Supabase 의존을
제거했으므로, 콘텐츠를 고치려면 DB가 아니라 HTML을 고친다. 자세한 내용은
아래 "보도자료 · 교육영상" 섹션 참조.

## 페이지 구조 (활성 18개)

GNB 5개 대메뉴 + 서브메뉴:

```
index.html            메인
│
├ 전략 자문
│   about.html         해외공공조달
│   members.html       해외 공공조달 전문가 (탭: 김만기 교수 / 이미정 원장)
│   history.html       히스토리 (지그재그 타임라인)
│   organization.html  조직도
│
├ 글로벌 사업
│   work.html          사업 분야 (탭: 주요 실적 / 서비스 소개)
│   performance.html   주요 실적
│   services.html      서비스 소개
│   gpdi-usa.html      GPDI USA
│   gpdi-uae.html      GPDI UAE
│   gpdi-ukraine.html  GPDI Ukraine
│
├ 산업 솔루션
│   healthcare.html    헬스케어
│   smartcity.html     스마트시티
│   defense.html       국방안전
│
├ AI 전환
│   ai.html            AX·DX / ICT·인프라
│
└ 문의·위치
    contact.html
```

**GNB에 없고 메인에서만 진입하는 콘텐츠 페이지 2개:**

```
press.html        보도자료 전체 51건   (index.html 하단 "전체 보도자료 보기")
education.html    교육영상 전체 17건   (index.html 하단 "전체 교육영상 보기")
```

**건드리지 말 것 — 날짜 스냅샷 3개** (당시 상태 보존용, 어디서도 링크되지 않음):
`ai_04_27.html` · `smartcity_06_05.html` · `work_04_27.html`

**팝업**: `sub/pop_privacy.html` · `sub/pop_email.html` (푸터에서 링크)

## 보도자료 · 교육영상 (DB 없음, HTML이 원본)

2026-08-06 Supabase 의존을 제거하고 정적 HTML로 전환했다. 갱신 빈도가
보도자료 연 7건 · 교육영상 4년째 0건이라 DB와 어드민이 과한 구조였고,
Supabase 프로젝트가 사라지면서 사용자에게 "불러오기 실패"가 노출되던 문제도 있었다.

| 대상 | 위치 |
|---|---|
| 보도자료 전체 51건 | `press.html` 의 `<ul id="pp-list">` |
| 교육영상 전체 17건 | `education.html` 의 `<ul id="ed-grid">` |
| 메인 보도자료 12건 | `index.html` 의 `<ul id="landing-press-list">` |
| 메인 교육영상 6건 | `index.html` 의 `<ul id="landing-video-list">` |

**항목 추가 방법** — 해당 `<ul>` 안에 `<li>`를 직접 넣는다. 기존 항목의 마크업을
그대로 복사해서 제목·링크·날짜만 바꾸면 된다. 전체 목록과 메인 목록은 별개이므로,
메인에도 노출하려면 **두 곳 모두** 넣어야 한다.

**정렬 규칙** — 최신순. `published_at` 내림차순이고, 같은 날짜면 **나중에 등록한 것이 위**.
(원래 DB 쿼리 `order by published_at desc, id desc` 를 그대로 재현한 순서다.)

**주의**
- 제목에 `&` 가 들어가면 `&amp;` 로 이스케이프한다.
- 교육영상은 YouTube ID가 있으면 `https://i.ytimg.com/vi/{ID}/hqdefault.jpg` 썸네일 카드로,
  없으면 `.ed-card__placeholder` 텍스트 카드로 렌더된다.
- 현재 교육영상 17건 중 **4건은 링크가 404**다. `youtube_id` 없이 사라진 구 PHP 사이트
  (`gpdi.kr/sub/sub03_04.php`)를 가리킨다. 영상을 찾으면 링크만 교체하면 된다.

**아카이브**
- `supabase/01_setup.sql` · `02_seed.sql` — 원본 데이터 기록. 사이트에서 참조하지 않음.
  실수로 지웠을 때 복구용이므로 리포에 남겨둔다. (`supabase/README.md` 참조)
- `_백업/supabase-백엔드_2026-08-02/` — 폐기한 어드민 UI와 Supabase 클라이언트

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

`_백업/` 폴더는 `.gitignore`로 제외되어 GitHub에는 올라가지 않는다.
**따라서 잃으면 안 되는 데이터 기록은 `_백업/`에 넣지 말 것** — gitignore 대상이라
원격 백업이 되지 않는다. (그래서 `supabase/*.sql` 은 리포 안에 둔다.)

## 공용 컴포넌트

### 헤더 (모든 페이지 동일)
- 로고: `images/GPDI_LOGO_white.svg` (히어로 어두운 배경용)
- GNB 5개 대메뉴: 전략 자문 / 글로벌 사업 / 산업 솔루션 / AI 전환 / 문의·위치
- 언어 토글: KOR / ENG (`js/lang.js`)
- 현재 페이지 하이라이트: `<li class="is-current">` 클래스 사용

### 모바일 내비게이션 드로어 (≤1180px)
- 햄버거 버튼 `#navToggle`, 배경 스크림 `#navScrim`, 드로어는 `#gnb` 자체가 변신
- 열림 상태는 `body.nav-open` 클래스로 제어. 스크롤 잠금 + 포커스 트랩 + ESC 닫기 포함
- 각 HTML의 `<style>` 블록과 페이지 하단 인라인 `<script>`에 **페이지마다 복제**되어 있다.
  드로어 동작을 고치려면 18개 페이지를 전부 수정해야 한다.
- 주의: 플로팅 INFO 버튼(`z-index:200`)이 드로어를 덮지 않도록 `body.nav-open`일 때 숨긴다.
  헤더(z-100)보다 드로어(z-99)가 낮아야 햄버거가 눌리므로 z-index로 풀지 말 것.

### 푸터 (모든 페이지 동일)
- 클래스 prefix: `gp-footer`
- 배경: `#3a3f4a`
- 구조: `.gp-footer__links` (상단 유틸) + `.gp-footer__info` (메인 인포)

### 언어 토글 규칙
- 텍스트 래핑: `<span class="t-ko">한글</span><span class="t-en">English</span>`
- `js/lang.js`가 **`<html data-lang>` 을 즉시 설정**(FOUC 방지)하고, DOMContentLoaded에
  `<body data-lang>` 도 동기화한다. 각 HTML의 `body[data-lang="…"]` CSS 규칙보다
  lang.js가 주입하는 `html[data-lang="…"]` 규칙이 우선한다.
- 사용자 선택은 `localStorage("gpdi-lang")`에 저장되어 페이지 간 유지된다.
- 줄바꿈이 필요한 블록에는 `is-block` 클래스를 함께 붙인다.

## 서브메뉴 앵커 규칙

각 페이지의 하위 섹션에 id를 붙여 GNB 서브메뉴에서 점프:

| 페이지 | 실제 존재하는 앵커 |
|---|---|
| work.html | `#tab-performance`, `#tab-services` |
| healthcare.html | `#hc-expertise`, `#hc-partners`, `#hc-performance`, `#hc-methodology` |
| smartcity.html | `#sc-focus`, `#sc-approach`, `#sc-process` |
| ai.html | `#ax-axdx`, `#ax-ict-infra`, `#ax-global`, `#ax-process`, `#ax-why` |

## 디렉터리 구조

```
images/
├ GPDI_LOGO.svg · GPDI_LOGO_white.svg · GPDI_Symbol.svg
├ about/      국기 (info06_01_country01~04.png), 멤버 사진 (member_kim_2026.png 등)
├ agencies/   기관 로고
└ main/       배너(web-banner-1·2.png), 월드맵, 아이콘, 푸터 로고(f_logo02.png)

js/
└ lang.js     언어 토글 (유일한 공용 스크립트)

supabase/     아카이브 — 사이트에서 참조하지 않음 (데이터 원본 기록)
sub/          팝업 2종
```

`images/common/` 과 `images/sub/` 는 **존재하지 않는다.** 과거 HTML이 이 경로를
참조해 전 페이지에서 404가 나던 것을 2026-08-02에 정리했다. 새 이미지는
용도에 맞춰 `about/` · `agencies/` · `main/` 중 하나에 넣는다.

## 작업 관례

1. **HTML 수정 시**: 같은 구조·스타일 패턴을 다른 페이지에도 적용 (일관성)
2. **공용 요소 변경 시**: 헤더·푸터·드로어는 페이지마다 복제되어 있으므로
   **활성 18개 HTML 전체를 일괄 수정**해야 한다 (스크립트 활용 권장)
3. **새 페이지 추가 시**: 18개 HTML 전부의 GNB에 링크 추가
   (index.html은 `t-ko`/`t-en` 2개국어 구조라 span 2개를 넣어야 함)
4. **외부 절대경로 금지**: `https://www.gpdi.kr/...` 로 자기 사이트 리소스를 참조하지 말 것.
   상대경로를 쓴다. 절대경로는 www→apex 301 홉을 매번 발생시킨다.
5. **공개하면 안 되는 정보**:
   - 구체적인 프로젝트명 (예: 태국 람차방, 솔라시도, 세종 5-1) — 카테고리로 일반화
   - 파트너사 실명 (예: Frey Group, 씨젠) — "유럽 개발사", "진단 전문기업" 등으로
   - 제안서 PDF·내부 문서는 `_백업/문서/` 보관 (절대 공개 안 됨)

## 배포 후 확인

푸시 후 실제로 반영됐는지 확인하는 것이 좋다.

```bash
git add .
git commit -m "수정 내용"
git push
```

- Actions 상태: `https://api.github.com/repos/UIX-Dev/GPDI/actions/runs?per_page=3`
- 라이브 확인: 브라우저로 https://gpdi.kr 접속 후 콘솔 에러 / 404 요청 점검
- 배포는 보통 40초~2분. `pages build and deployment` 워크플로가 자동으로 돈다.

- `user.email`: dev.cununa@gmail.com
- `user.name`: Kelly
- 줄바꿈 정책: `.gitattributes`에 `* text=auto eol=lf` (저장소는 LF로 통일)

## 현재 진행 상황 (2026-08-06 기준)

- [x] 활성 18개 페이지 구축 완료, gpdi.kr 커스텀 도메인 배포 중
- [x] 모바일 내비게이션 드로어 전 페이지 이식 (≤1180px) + 반응형 오버플로 제거
- [x] 조직도(organization) · 국방안전(defense) · 주요실적(performance) · 서비스(services) 추가
- [x] 보도자료 51건 · 교육영상 17건 정적 HTML 전환 (Supabase 의존 제거)
- [x] 죽은 외부 참조 정리 (`images/common/` 404, 구 도메인 절대경로, 없는 이미지)
- [ ] 교육영상 4건 — 구 PHP 사이트를 가리켜 링크 404. 영상 찾아서 교체 필요
- [ ] `sub/pop_privacy.html` · `pop_email.html` — 기본 스텁만 있음, 정식 문구 필요
- [ ] 다국어 영문(ENG) 번역 — 인프라만 있고 컨텐츠 미번역
