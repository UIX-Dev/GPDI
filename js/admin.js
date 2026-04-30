// GPDI Admin — 로그인 + CRUD (보도자료 / 교육영상)
import { supabase, extractYouTubeId, videoLinkAndThumb, esc } from './supabase.js';

// 사용자가 보는 ID는 'admin', 실제 Supabase Auth 이메일은 admin@gpdi.kr
const ADMIN_EMAIL = 'admin@gpdi.kr';

const PAGE_SIZE = 20;

const state = {
  tab: 'press',         // 'press' | 'video'
  page: 1,
  total: 0,
  editingId: null,
};

// ===== DOM 헬퍼 =====
const $  = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function toast(msg, isErr = false) {
  const t = $('#ad-toast');
  t.textContent = msg;
  t.classList.toggle('ad-toast--err', isErr);
  t.classList.add('is-show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('is-show'), 2400);
}

// ===== 인증 =====
async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) showDash(data.session);
  else showLogin();
}

function showLogin() {
  $('#login-view').style.display = '';
  $('#dash-view').style.display = 'none';
  $('#login-pw').value = '';
}

function showDash(session) {
  $('#login-view').style.display = 'none';
  $('#dash-view').style.display = '';
  $('#hdr-user').textContent = session.user.email;
  loadList();
}

$('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = $('#login-id').value.trim();
  const pw = $('#login-pw').value;
  const errBox = $('#login-error');
  errBox.style.display = 'none';

  // 'admin' → admin@gpdi.kr 매핑 (이미 이메일 형식이면 그대로 사용)
  const email = /@/.test(id) ? id : ADMIN_EMAIL;

  $('#login-submit').disabled = true;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw });
  $('#login-submit').disabled = false;

  if (error) {
    errBox.textContent = `로그인 실패: ${error.message}`;
    errBox.style.display = '';
    return;
  }
  showDash(data.session);
});

$('#logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  showLogin();
});

// ===== 탭 =====
$$('.ad-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('is-active')) return;
    $$('.ad-tab').forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    state.tab = btn.dataset.tab;
    state.page = 1;
    state.editingId = null;
    closeForms();
    loadList();
  });
});

// ===== 폼 토글 =====
function activeForm() {
  return state.tab === 'press' ? $('#press-form') : $('#video-form');
}

function closeForms() {
  $$('.ad-form').forEach(f => f.classList.remove('is-open'));
  state.editingId = null;
}

function openForm(record = null) {
  closeForms();
  const form = activeForm();
  form.reset();
  if (record) {
    state.editingId = record.id;
    form.querySelector('[name="title"]').value = record.title;
    form.querySelector('[name="published_at"]').value = record.published_at;
    form.querySelector('[name="is_published"]').checked = !!record.is_published;
    if (state.tab === 'press') {
      form.querySelector('[name="url"]').value = record.url || '';
    } else {
      form.querySelector('[name="youtube_url"]').value = record.youtube_id || '';
      form.querySelector('[name="external_url"]').value = record.external_url || '';
    }
    form.querySelector('button[type="submit"]').textContent = '수정 저장';
  } else {
    state.editingId = null;
    form.querySelector('[name="published_at"]').value = new Date().toISOString().slice(0, 10);
    form.querySelector('button[type="submit"]').textContent = '추가';
  }
  form.classList.add('is-open');
  form.querySelector('[name="title"]').focus();
}

$('#ad-new-btn').addEventListener('click', () => openForm(null));
$$('.ad-form [data-act="cancel"]').forEach(b => b.addEventListener('click', closeForms));

// ===== 폼 저장 =====
$('#press-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const payload = {
    title: f.title.value.trim(),
    url: f.url.value.trim() || null,
    published_at: f.published_at.value,
    is_published: f.is_published.checked,
  };
  if (!payload.title || !payload.published_at) return toast('제목과 날짜는 필수입니다.', true);

  const { error } = state.editingId
    ? await supabase.from('press_releases').update(payload).eq('id', state.editingId)
    : await supabase.from('press_releases').insert(payload);

  if (error) return toast('저장 실패: ' + error.message, true);
  toast(state.editingId ? '수정 완료' : '추가 완료');
  closeForms();
  loadList();
});

$('#video-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;
  const ytId   = extractYouTubeId(f.youtube_url.value.trim());
  const extUrl = f.external_url.value.trim();

  if (!ytId && !extUrl) {
    return toast('YouTube URL 또는 외부 링크 중 하나는 입력해야 합니다.', true);
  }

  const payload = {
    title: f.title.value.trim(),
    youtube_id: ytId,                      // ytId 있으면 우선
    external_url: ytId ? null : extUrl,    // ytId 있으면 external_url은 null
    published_at: f.published_at.value,
    is_published: f.is_published.checked,
  };
  if (!payload.title || !payload.published_at) return toast('제목과 날짜는 필수입니다.', true);

  const { error } = state.editingId
    ? await supabase.from('education_videos').update(payload).eq('id', state.editingId)
    : await supabase.from('education_videos').insert(payload);

  if (error) return toast('저장 실패: ' + error.message, true);
  toast(state.editingId ? '수정 완료' : '추가 완료');
  closeForms();
  loadList();
});

// ===== 목록 로드 =====
async function loadList() {
  const $wrap = $('#ad-list-wrap');
  $wrap.innerHTML = `<div class="ad-loading">불러오는 중…</div>`;
  $('#ad-pager').innerHTML = '';

  const from = (state.page - 1) * PAGE_SIZE;
  const to   = from + PAGE_SIZE - 1;
  const tableName = state.tab === 'press' ? 'press_releases' : 'education_videos';
  const cols = state.tab === 'press'
    ? 'id, title, url, published_at, is_published'
    : 'id, title, youtube_id, external_url, published_at, is_published';

  // admin은 인증되어 있어 is_published=false도 보임
  const { data, count, error } = await supabase
    .from(tableName)
    .select(cols, { count: 'exact' })
    .order('published_at', { ascending: false })
    .order('id', { ascending: false })
    .range(from, to);

  if (error) {
    $wrap.innerHTML = `<div class="ad-loading" style="color:#b87860">불러오기 실패: ${esc(error.message)}</div>`;
    return;
  }

  state.total = count || 0;
  $('#ad-total').textContent = state.total;
  const totalPages = Math.max(1, Math.ceil(state.total / PAGE_SIZE));
  if (state.page > totalPages) { state.page = totalPages; return loadList(); }

  if (!data || data.length === 0) {
    $wrap.innerHTML = `<div class="ad-loading">아직 항목이 없습니다. 우측 상단 "+ 새 항목 추가"로 시작하세요.</div>`;
    return;
  }

  $wrap.innerHTML = state.tab === 'press' ? renderPressTable(data) : renderVideoTable(data);
  renderPager(totalPages);
  bindRowActions(data);
}

function renderPressTable(rows) {
  return `
    <table class="ad-table">
      <thead><tr>
        <th>날짜</th><th>제목 / 링크</th><th>상태</th><th></th>
      </tr></thead>
      <tbody>
        ${rows.map(r => `
          <tr data-id="${r.id}">
            <td class="ad-td-date">${esc(r.published_at)}</td>
            <td>
              <span class="ad-title">${esc(r.title)}</span>
              <span class="ad-meta">${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a>` : '— 링크 없음'}</span>
            </td>
            <td class="ad-td-flag"><span class="ad-flag ${r.is_published ? 'ad-flag--on' : 'ad-flag--off'}">${r.is_published ? '발행' : '비공개'}</span></td>
            <td class="ad-td-actions">
              <button class="ad-act-btn" data-act="edit">편집</button>
              <button class="ad-act-btn ad-act-btn--danger" data-act="del">삭제</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function renderVideoTable(rows) {
  return `
    <table class="ad-table">
      <thead><tr>
        <th></th><th>날짜</th><th>제목 / 링크</th><th>상태</th><th></th>
      </tr></thead>
      <tbody>
        ${rows.map(r => {
          const { thumb, hasThumb } = videoLinkAndThumb(r);
          const headTag = (r.title.split(']')[0] || '영상').slice(0, 12) + (r.title.includes(']') ? ']' : '');
          const thumbHtml = hasThumb
            ? `<img src="${thumb}" alt="" onerror="this.style.display='none'">`
            : `<div class="ad-thumb-ph">${esc(headTag)}</div>`;
          const linkLine = r.youtube_id
            ? `<a href="https://www.youtube.com/watch?v=${esc(r.youtube_id)}" target="_blank" rel="noopener">YouTube · ${esc(r.youtube_id)}</a>`
            : (r.external_url ? `<a href="${esc(r.external_url)}" target="_blank" rel="noopener">${esc(r.external_url)}</a>` : '— 링크 없음');
          return `
            <tr data-id="${r.id}">
              <td class="ad-td-thumb">${thumbHtml}</td>
              <td class="ad-td-date">${esc(r.published_at)}</td>
              <td>
                <span class="ad-title">${esc(r.title)}</span>
                <span class="ad-meta">${linkLine}</span>
              </td>
              <td class="ad-td-flag"><span class="ad-flag ${r.is_published ? 'ad-flag--on' : 'ad-flag--off'}">${r.is_published ? '발행' : '비공개'}</span></td>
              <td class="ad-td-actions">
                <button class="ad-act-btn" data-act="edit">편집</button>
                <button class="ad-act-btn ad-act-btn--danger" data-act="del">삭제</button>
              </td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

function bindRowActions(rows) {
  $$('#ad-list-wrap tr[data-id]').forEach(tr => {
    const id = parseInt(tr.dataset.id, 10);
    const record = rows.find(r => r.id === id);
    tr.querySelector('[data-act="edit"]').addEventListener('click', () => openForm(record));
    tr.querySelector('[data-act="del"]').addEventListener('click', async () => {
      if (!confirm(`정말 삭제하시겠어요?\n\n"${record.title}"`)) return;
      const tbl = state.tab === 'press' ? 'press_releases' : 'education_videos';
      const { error } = await supabase.from(tbl).delete().eq('id', id);
      if (error) return toast('삭제 실패: ' + error.message, true);
      toast('삭제 완료');
      loadList();
    });
  });
}

function renderPager(totalPages) {
  const $p = $('#ad-pager');
  if (totalPages <= 1) { $p.innerHTML = ''; return; }
  const cur = state.page;
  const set = new Set([1, totalPages, cur]);
  for (let i = 1; i <= 2; i++) {
    if (cur - i >= 1) set.add(cur - i);
    if (cur + i <= totalPages) set.add(cur + i);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const html = [];
  html.push(`<button data-p="${cur - 1}" ${cur === 1 ? 'disabled' : ''}>‹</button>`);
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    html.push(p === cur
      ? `<button class="is-current" disabled>${p}</button>`
      : `<button data-p="${p}">${p}</button>`);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      html.push(`<span class="ad-ellipsis">…</span>`);
    }
  }
  html.push(`<button data-p="${cur + 1}" ${cur === totalPages ? 'disabled' : ''}>›</button>`);
  $p.innerHTML = html.join('');
  $p.querySelectorAll('button[data-p]').forEach(b => {
    b.addEventListener('click', () => {
      const np = parseInt(b.dataset.p, 10);
      if (np >= 1 && np <= totalPages) {
        state.page = np;
        loadList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

// 시작
checkSession();
