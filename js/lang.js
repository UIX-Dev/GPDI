/* ==============================================================
   GPDI — 언어 토글 시스템 (KOR/ENG)
   ----------------------------------------------------------------
   - <head>에서 동기 실행 (defer 없음) → 본문 페인트 전에 적용됨
   - 1단계(즉시): <html data-lang> 설정 + FOUC 방지 <style> 주입
   - 2단계(DOMContentLoaded): <body>·토글 버튼 동기화 + 클릭 바인딩
   - 사용자 선택은 localStorage("gpdi-lang")에 저장 → 페이지 간 유지
   ============================================================== */
(function () {
  var STORAGE_KEY = "gpdi-lang";
  var DEFAULT_LANG = "ko";

  function getLang() {
    try {
      var l = localStorage.getItem(STORAGE_KEY);
      return (l === "ko" || l === "en") ? l : DEFAULT_LANG;
    } catch (e) { return DEFAULT_LANG; }
  }

  /* === 1단계: 즉시 실행 (body 파싱 전) === */
  var initialLang = getLang();
  document.documentElement.setAttribute("data-lang", initialLang);
  document.documentElement.setAttribute("lang", initialLang);

  var headEl = document.head || document.getElementsByTagName("head")[0];
  if (headEl) {
    var foucStyle = document.createElement("style");
    foucStyle.id = "gpdi-lang-fouc";
    foucStyle.textContent = [
      /* html[data-lang] 기준으로 t-ko / t-en 가시성 강제 — body[data-lang] 규칙을 덮음 */
      'html[data-lang="ko"] .t-en,html[data-lang="ko"] .t-en.is-block{display:none!important}',
      'html[data-lang="ko"] .t-ko{display:inline!important}',
      'html[data-lang="ko"] .t-ko.is-block{display:block!important}',
      'html[data-lang="en"] .t-ko,html[data-lang="en"] .t-ko.is-block{display:none!important}',
      'html[data-lang="en"] .t-en{display:inline!important}',
      'html[data-lang="en"] .t-en.is-block{display:block!important}',
      /* 토글 버튼 활성 상태도 html[data-lang] 기반으로 재정의 (HTML의 하드코딩된 is-active 무시) */
      'html[data-lang="en"] .lang-btn[data-lang="ko"].is-active{color:rgba(255,255,255,.55)!important;background:transparent!important}',
      'html[data-lang="en"] .lang-btn[data-lang="en"]{color:#fff!important;background:rgba(83,84,112,.85)!important}',
      'html[data-lang="ko"] .lang-btn[data-lang="en"].is-active{color:rgba(255,255,255,.55)!important;background:transparent!important}',
      'html[data-lang="ko"] .lang-btn[data-lang="ko"]{color:#fff!important;background:rgba(83,84,112,.85)!important}'
    ].join('');
    headEl.appendChild(foucStyle);
  }

  /* === 2단계: DOM 준비 후 동기화 === */
  function setLang(lang) {
    if (lang !== "ko" && lang !== "en") return;
    if (document.body) document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
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
    var lang = getLang();
    if (document.body) document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
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
