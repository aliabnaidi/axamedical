const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'AXA_MedTech_Website_v2_AXAMEDICAL');
const port = Number(process.env.PORT) || 3000;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "media-src 'self'",
    "worker-src 'self'"
  ].join('; ')
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { ...securityHeaders, 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function safePath(urlPath) {
  if (urlPath.includes('\\0')) return null;
  const decoded = decodeURIComponent(urlPath);
  if (decoded.includes('\0')) return null;
  const relative = decoded.replace(/^\/+/, '');
  if (relative.split('/').some(part => part === '..')) return null;
  const candidate = path.resolve(root, relative || 'index.html');
  if (candidate !== root && !candidate.startsWith(root + path.sep)) return null;
  return candidate;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method Not Allowed');
  }

  let urlPath;
  try {
    urlPath = new URL(req.url, 'http://localhost').pathname;
  } catch {
    return send(res, 400, 'Bad Request');
  }

  if (urlPath.length > 2048) return send(res, 414, 'URI Too Long');

  let file;
  try {
    file = safePath(urlPath);
  } catch {
    return send(res, 400, 'Bad Request');
  }
  if (!file) return send(res, 403, 'Forbidden');

  fs.stat(file, (statErr, stats) => {
    if (statErr || !stats.isFile()) return send(res, 404, 'Not Found');

    const ext = path.extname(file).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    const headers = { ...securityHeaders, 'Content-Type': type };
    // Immutable caching is safe for fingerprinted assets; keep HTML fresh.
    headers['Cache-Control'] = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
});

server.on('clientError', (_err, socket) => socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'));

server.listen(port, '127.0.0.1', () => {
  console.log(`AXAMEDICAL running at http://127.0.0.1:${port}`);
});
