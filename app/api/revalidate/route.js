import { revalidatePath } from 'next/cache';

const ALLOWED_PATHS = new Set([
  '/',
  '/projects',
  '/art',
  '/favorites',
  '/timeline',
  '/blog',
  '/contact',
]);

export async function POST(request) {
  const { path, layout } = await request.json().catch(() => ({}));

  if (!ALLOWED_PATHS.has(path)) {
    return Response.json({ revalidated: false, error: 'Unknown path' }, { status: 400 });
  }

  if (layout && path === '/') {
    // Theme is injected in the root layout, which every route shares, so a
    // theme save needs to invalidate every cached route, not just "/".
    revalidatePath('/', 'layout');
  } else {
    revalidatePath(path);
    if (path === '/blog') {
      revalidatePath('/blog/[slug]', 'page');
    }
  }

  return Response.json({ revalidated: true });
}
