# Copilot instructions — maya-site

Purpose
- Help AI coding agents understand this repository's architecture, conventions, and quick developer workflows so edits are accurate and low-risk.

Big picture
- Next.js (App Router) personal site with a Firebase-backed admin CMS. Public routes live in `app/`, admin routes in `app/admin/`, shared UI in `components/`.
- All content (home bio, contact, social links, projects, art, photos, favorites, timeline, blog posts, theme) lives in Firestore. There is no bundled JSON content and no static fallback data; empty collections render an empty state on the public site.
- Images are URL-only. There is no Firebase Storage upload flow; every image field is a plain URL typed into an admin form and rendered with a plain `<img>` tag (not `next/image`).
- Module alias `@/` is configured in `jsconfig.json` to point to project root.

Key files & patterns
- `lib/db.js` — generic Firestore helpers (`getSingleton`, `setSingleton`, `listCollection`, `addItem`, `updateItem`, `removeItem`) used by every page and every admin form.
- `lib/useSingletonDoc.js` — shared client hook for singleton-doc admin forms (home, contact, theme).
- `lib/auth.js` — Firebase Auth, single hardcoded owner email allowlist (`OWNER_EMAIL`), enforced client-side in `app/admin/layout.jsx` and server-side in `firestore.rules`.
- `lib/posts.js` — blog-specific helpers (slug generation, `getAllPosts`, `getPostBySlug`).
- `components/admin/CollectionEditor.jsx` — shared list + create/edit/delete form used by every collection-backed admin page (art, photos, favorites, projects, timeline, blog).
- `app/api/revalidate/route.js` — called by admin forms after a write so the matching public page revalidates immediately instead of waiting for the ISR window.
- Page pattern: `app/<route>/page.jsx` exports `metadata`, `revalidate = 300`, and an async component that fetches via `lib/db.js`.

Developer workflows
- `npm run dev`, `npm run build`, `npm run start`. No test suite configured.
- Firebase project: `maya-site-ee40b`. Firestore/Storage security rules in `firestore.rules` / `storage.rules`.

Conventions and constraints
- Single global stylesheet: `styles/components.css`. No CSS framework, no gradients, no decorative animation.
- Fonts via `next/font/google` (Inter, Lora) wired to CSS variables in `app/layout.jsx`; the admin theme editor only ever picks between the two, never an arbitrary font URL.
- Plain JavaScript project (no TypeScript). Use the `@/` alias for imports.
- Do not add fallback JSON content or reintroduce Firebase Storage image uploads; both were removed deliberately.

If something is unclear
- Ask what the intended change should be; reference `lib/db.js` and `components/admin/CollectionEditor.jsx` for the established data and admin-form patterns before inventing new ones.
