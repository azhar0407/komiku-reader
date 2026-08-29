export async function onRequestGet({request,params}) {
  const path = '/' + (Array.isArray(params.path) ? params.path.join('/') : params.path || '');
  if (!/^\/(manga|chapter|at-home\/server)(\/|$)/.test(path)) return new Response('Tidak ditemukan', {status: 404});
  const source = new URL(request.url);
  const upstream = new URL(path + source.search, 'https://api.mangadex.org');
  const response = await fetch(upstream, {headers: {
    'Accept': 'application/json',
    'User-Agent': 'RuangManga/1.0 (personal MangaDex reader; github.com/azhar0407/komiku-reader)'
  }});
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', response.ok ? 'public, max-age=15, s-maxage=60' : 'no-store');
  headers.delete('set-cookie');
  return new Response(response.body, {status: response.status, headers});
}
