// 랜딩 페이지에서 보도자료 12개 + 교육영상 6개를 Supabase에서 가져와 렌더
import { supabase, videoLinkAndThumb, esc } from './supabase.js';

const LANDING_PRESS_LIMIT = 12;
const LANDING_VIDEO_LIMIT = 6;

async function renderPress() {
  const ul = document.getElementById('landing-press-list');
  if (!ul) return;
  const { data, error } = await supabase
    .from('press_releases')
    .select('id, title, url, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(LANDING_PRESS_LIMIT);

  if (error) {
    ul.innerHTML = `<li style="padding:18px 20px;color:#999">불러오기 실패: ${esc(error.message)}</li>`;
    return;
  }

  ul.innerHTML = data.map(item => `
    <li style="border-bottom:1px solid #eceff5">
      <a href="${esc(item.url || '#')}" target="_blank" rel="noopener" style="display:block;padding:18px 20px;color:inherit;text-decoration:none">
        <span style="font-size:11px;color:#888">${esc(item.published_at)}</span>
        <div>${esc(item.title)}</div>
      </a>
    </li>`).join('');
}

async function renderVideos() {
  const ul = document.getElementById('landing-video-list');
  if (!ul) return;
  const { data, error } = await supabase
    .from('education_videos')
    .select('id, title, youtube_id, external_url, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(LANDING_VIDEO_LIMIT);

  if (error) {
    ul.innerHTML = `<li style="padding:14px 16px;color:#999">불러오기 실패: ${esc(error.message)}</li>`;
    return;
  }

  ul.innerHTML = data.map(v => {
    const { link, thumb, hasThumb } = videoLinkAndThumb(v);
    const media = hasThumb
      ? `<img src="${thumb}" alt="" style="width:100%;aspect-ratio:480/360;object-fit:cover;display:block;background:#e5e2dc" onerror="this.style.display='none'">`
      : `<div class="video-list__placeholder" aria-hidden="true">${esc(v.title.split(']')[0] + (v.title.includes(']') ? ']' : ''))}</div>`;
    return `
      <li style="background:transparent;overflow:hidden">
        <a href="${esc(link)}" target="_blank" rel="noopener" style="display:block;color:inherit;text-decoration:none">
          ${media}
          <div style="padding:14px 16px">
            <div style="font-size:14px;font-weight:600;line-height:1.45">${esc(v.title)}</div>
            <span style="font-size:11px;color:#888">${esc(v.published_at)}</span>
          </div>
        </a>
      </li>`;
  }).join('');
}

renderPress();
renderVideos();
