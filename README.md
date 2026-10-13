# Ponuel Mollah Swadesh | Research Portfolio

Static website. No build step, no framework, no dependencies.

- `index.html` is the whole site (HTML, CSS and a small script for the filters).
- `assets/` holds the portrait, the CV and the certificate files the page links to.
- `old-site/` keeps the previous version of the portfolio, for reference.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Vercel serves the repository root as a static site. No build command or output folder is needed.
