# AXAMEDICAL security hardening

This package is a static marketing site. It does not contain a database, login system, API keys, or server-side form handler.

## Included hardening
- Strict security response headers in `server.js`.
- Content Security Policy (CSP) with same-origin scripts/resources.
- Clickjacking protection with `X-Frame-Options` and CSP `frame-ancestors`.
- MIME sniffing protection.
- Strict referrer policy and restrictive Permissions Policy.
- GET/HEAD-only static server with path traversal/null-byte protection.
- Server binds to `127.0.0.1` by default for local testing.
- `robots.txt` and `security.txt` included.

## Deployment
Prefer a reputable static hosting provider with HTTPS enabled. If using Nginx/Cloudflare/Netlify/Vercel, keep equivalent security headers at the edge.

## Important limitation
No website can honestly be guaranteed "unhackable". This hardening reduces common web risks, but the hosting account, DNS, domain, third-party services, admin accounts, and future code changes also need protection.
