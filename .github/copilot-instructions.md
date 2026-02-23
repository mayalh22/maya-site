# Copilot instructions — maya-site

Purpose
- Help AI coding agents understand this repository's architecture, conventions, and quick developer workflows so edits are accurate and low-risk.

Big picture
- This is a Next.js (app router) personal website using `app/` for routes and `components/` for shared UI. See `app/layout.jsx` for global layout and font imports.
- Data is simple JSON under `lib/content/` (e.g. `lib/content/about.json`) and is imported directly into pages.
- Static assets live in `public/assets/` and are referenced by `next/image` with paths like `/assets/profile.png`.
- Module alias `@/` is configured in `jsconfig.json` to point to project root; use `@/components/Header` or `@/lib/content/about.json`.

Key files & patterns (examples)
- Root layout: `app/layout.jsx` — imports global CSS and renders `<Header />`.
- Page pattern: `app/<route>/page.jsx` exports `metadata` and a default React component. Example: `app/page.jsx` imports `about.json` and renders content.
- Shared UI: `components/Header.jsx` — navigation uses `next/link` and `next/image`; keep `width`/`height` props on `Image`.
- Content: `lib/content/*.json` — small data objects (name, tagline, photo) used by pages.

Developer workflows
- Run dev server: `npm run dev` (runs `next dev`).
- Build for production: `npm run build` (also used by Vercel via `vercel-build`).
- Start production server: `npm run start` after build.
- No tests configured in `package.json`.

Conventions and constraints
- Keep styling as global CSS files in `styles/` (e.g., `styles/layout.css`, `styles/components.css`). Do not convert to CSS modules unless converting all consumers.
- Image assets: prefer placing images in `public/assets/` and reference with `/assets/...` (not importing binary blobs inside JS).
- JSON content: edit `lib/content/*.json` for textual/content changes rather than hard-coding strings in components.
- Use `@/` alias for imports (consistent across codebase). Don't introduce relative imports that bypass the alias unless necessary.
- Project is plain JavaScript (no TypeScript). Keep new files consistent with `type: module` in `package.json`.

What to avoid
- Reformatting unrelated files or changing global CSS class names — many pages depend on present classes.
- Moving images out of `public/` without updating `next.config.js` (none present).

Notes for PRs and edits
- Small content changes: update `lib/content/*.json` and preview with `npm run dev`.
- UI changes: update `components/*` and corresponding CSS in `styles/`.
- When adding routes, follow `app/<route>/page.jsx` pattern and export `metadata` where relevant.

If something is unclear
- Ask what the intended visual change or content change should be; reference file examples (e.g., `app/page.jsx`, `components/Header.jsx`).

Please review and tell me if you want more detail about build hooks, deployment (Vercel), or additional examples.
