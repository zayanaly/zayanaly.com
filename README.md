# YOUR BRAND — Static Website Starter

A clean, professional, mobile-first static site that you can deploy 100% free.

## What's inside
- `index.html`, `about.html`, `contact.html`, `privacy.html`
- `styles.css` with a modern, dark theme you can adjust in `:root`
- `script.js` for small UX touches
- `assets/favicon.svg`
- SEO basics: meta tags, `sitemap.xml`, `robots.txt`

## How to deploy for free (GitHub Pages)
1. Create a GitHub account (if you don't have one).
2. Make a repository named `yourusername.github.io` (replace with your username).
3. Upload all files from this folder to the repo root.
4. In repo **Settings → Pages**, make sure the Source is "Deploy from a branch" and branch is `main` / root.
5. In a few minutes, your site will be live at `https://yourusername.github.io`.

## Connect your custom domain (kept at Squarespace registrar)
1. In GitHub, go to **Settings → Pages → Custom domain** and enter `yourdomain.com`. This creates a `CNAME` file.
2. In your **Squarespace Domains/DNS** panel (where your domain lives), create these DNS records:
   - **A** @ → `185.199.108.153`
   - **A** @ → `185.199.109.153`
   - **A** @ → `185.199.110.153`
   - **A** @ → `185.199.111.153`
   - **CNAME** `www` → `yourusername.github.io.`
3. Wait up to an hour for DNS to propagate. Then visit `https://yourdomain.com`.
4. In GitHub Pages, enable **Enforce HTTPS**.

> Prefer Netlify or Cloudflare Pages? Drag‑and‑drop this folder into Netlify/Cloudflare. Add your domain there and they will give you the DNS records to paste into Squarespace.

## Customize
- Find/replace **YOUR BRAND** and `you@yourdomain.com`.
- Update colors in `styles.css` `:root`.
- Swap the star in the logo for your own SVG in `assets/favicon.svg`.

## Optional: Free contact form
- If you deploy to **Netlify**, uncomment the form in `contact.html` and it will work without code.
- Or use a `mailto:` link (already included), or a Google Form.
