// GPDI — Supabase 클라이언트
// publishable(anon) 키만 들어감. 서버에서만 쓰는 secret 키는 절대 여기 두지 말 것.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = 'https://jvqwwaywruccnncbxbpu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_m1xdXkDbppfpWs8Hzt6Awg_uKcIrGU1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ===== 공용 유틸 =====

// YouTube URL 또는 11자 ID에서 ID 추출. 실패 시 null.
export function extractYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

// 영상 카드 → 표시할 (link, thumbnail) 결정
export function videoLinkAndThumb(video) {
  if (video.youtube_id) {
    return {
      link: `https://www.youtube.com/watch?v=${video.youtube_id}`,
      thumb: `https://i.ytimg.com/vi/${video.youtube_id}/hqdefault.jpg`,
      hasThumb: true
    };
  }
  return {
    link: video.external_url || '#',
    thumb: null,
    hasThumb: false
  };
}

// 안전한 텍스트 삽입(HTML escape)
export function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
