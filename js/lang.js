/* ==============================================================
   GPDI — 언어 토글 시스템 (KOR/ENG)
   ----------------------------------------------------------------
   사용법:
   1) <body data-lang="ko"> 로 시작
   2) 이중언어 텍스트는 각 언어 래퍼로 감싼다
        <span class="t-ko">한글 텍스트</span>
        <span class="t-en">English text</span>
   3) 토글 버튼은 .lang-btn[data-lang="ko"|"en"]
   4) CSS에서 body[data-lang="ko"] .t-en{display:none} 등 정의
   5) 사용자 선택은 localStorage("gpdi-lang")에 저장 → 페이지 간 유지
   ============================================================== */
(function () {
  var STORAGE_KEY = "gpdi-lang";
  var DEFAULT_LANG = "ko";

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
    catch (e) { return DEFAULT_LANG; }
  }

  function setLang(lang) {
    if (lang !== "ko" && lang !== "en") return;
    document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    updateActiveButtons(lang);
    updateTitle(lang);
  }

  function updateActiveButtons(lang) {
    var btns = document.querySelectorAll(".lang-btn[data-lang]");
    btns.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  /* <title>이 data-ko/data-en 속성을 갖고 있으면 언어에 맞춰 교체 */
  function updateTitle(lang) {
    var t = document.querySelector("title[data-ko][data-en]");
    if (!t) return;
    t.textContent = t.getAttribute("data-" + lang) || t.textContent;
  }

  function bind() {
    var btns = document.querySelectorAll(".lang-btn[data-lang]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function init() {
    /* DOMContentLoaded 이후에 실행되도록 보장 */
    var lang = getLang();
    document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    updateActiveButtons(lang);
    updateTitle(lang);
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* 외부에서도 호출 가능 */
  window.GPDI_LANG = { set: setLang, get: getLang };
})();
