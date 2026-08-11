# zayanaly.com

The source for Zayan Aly's personal research website.

## Site structure

- `/` — concise introduction and site index
- `/about/` — biography and background
- `/research/` — developing doctoral research direction
- `/cv/` — accessible résumé summary and PDF download

A publications page will be added when there is a public preprint or paper to share.

## Design and architecture

- Dependency-free HTML, CSS, and JavaScript
- Responsive multi-page layout for GitHub Pages
- Automatic light/dark theme with a saved manual preference
- Accessible landmarks, keyboard focus, touch targets, and reduced-motion support
- Portable files with no proprietary site builder or database
- Privacy-friendly aggregate traffic measurement through GoatCounter; no custom IP, referrer, or user-agent logging

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Publishing

The site is published from `main` through GitHub Pages at [zayanaly.com](https://zayanaly.com/). The domain remains registered with Squarespace; GitHub Pages provides the hosting.
