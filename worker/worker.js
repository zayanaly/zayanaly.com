const CORS = {
  'Access-Control-Allow-Origin': 'https://zayanaly.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    if (request.method === 'POST' && url.pathname === '/hit') {
      let page = '', ref = '';
      try {
        const body = JSON.parse(await request.text());
        page = String(body.page || '').slice(0, 200);
        ref = String(body.ref || '').slice(0, 200);
      } catch {}
      await env.DB.prepare(
        'INSERT INTO visits (ts, ip, country, ua, page, ref) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        new Date().toISOString(),
        request.headers.get('CF-Connecting-IP') || '',
        request.cf?.country || '',
        (request.headers.get('User-Agent') || '').slice(0, 300),
        page,
        ref
      ).run();
      return new Response('ok', { headers: CORS });
    }

    if (request.method === 'GET' && url.pathname === '/log') {
      if (url.searchParams.get('key') !== env.LOG_KEY) {
        return new Response('forbidden', { status: 403 });
      }
      const { results } = await env.DB.prepare(
        'SELECT ts, ip, country, page, ref, ua FROM visits ORDER BY id DESC LIMIT 200'
      ).all();
      const esc = (s) => String(s ?? '').replace(/[&<>"]/g,
        (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const rows = results.map((r) =>
        `<tr><td>${esc(r.ts)}</td><td>${esc(r.ip)}</td><td>${esc(r.country)}</td><td>${esc(r.page)}</td><td>${esc(r.ref)}</td><td class="ua">${esc(r.ua)}</td></tr>`
      ).join('');
      const html = `<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>zayanaly.com — visit log</title>
<style>
  body { font: 13px/1.6 ui-monospace, Menlo, Consolas, monospace; margin: 1.5rem; color: #1e1b16; background: #f2efe8; }
  @media (prefers-color-scheme: dark) { body { color: #e9e4d8; background: #161411; } td, th { border-color: #333 !important; } }
  h1 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border-bottom: 1px solid #d6cfc0; padding: .3em .7em .3em 0; text-align: left; white-space: nowrap; }
  .ua { max-width: 28ch; overflow: hidden; text-overflow: ellipsis; }
</style>
<h1>Last ${results.length} visits</h1>
<table><tr><th>time (UTC)</th><th>ip</th><th>cc</th><th>page</th><th>referrer</th><th>agent</th></tr>${rows}</table>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
    }

    return new Response('not found', { status: 404 });
  },
};
