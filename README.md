# Ponuel Mollah Swadesh — Portfolio

Personal portfolio site for **Ponuel Mollah Swadesh**, ICT & Digital Development Officer.

Static HTML/CSS/JS — no build step, no framework runtime, no dependencies. Open `index.html` and it works.

## Local preview

Any static HTTP server works. Two options:

```bash
# Python (built-in)
python -m http.server 8000

# Node (no install)
npx --yes serve .
```

Then open http://localhost:8000.

## Project layout

| File | What it is |
|---|---|
| `index.html` | Production page — sections inlined, vanilla JS for reveal/filter/dot-nav/form. |
| `styles.css` | All styling. CSS custom properties drive accent + spacing. |
| `assets/` | Profile photo, gallery images, resume PDF. |
| `app.jsx`, `components.jsx`, `data.js`, `tweaks-panel.jsx` | Original Claude Design prototype source. Kept as a reference for the design intent — **not loaded by `index.html`**. |
| `uploads/` | Original asset uploads from the design tool. |
| `.claude/launch.json` | Dev-server configs for Claude Code's preview panel. |

## Deployment

Configured to deploy to **Vercel** from `main`. Pushing to `main` triggers an automatic redeploy.

## Credits

Design prototyped in Claude Design (claude.ai/design); production page hand-written for performance and zero runtime dependencies.
