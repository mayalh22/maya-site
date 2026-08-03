import { revalidatePath } from 'next/cache';

const ALLOWED_PATHS = new Set([
  '/',
  '/projects',
  '/art',
  '/photos',
  '/favorites',
  '/timeline',
  '/blog',
  '/contact',
]);

export async function POST(request) {
  const { path } = await request.json().catch(() => ({}));

  if (!ALLOWED_PATHS.has(path)) {
    return Response.json({ revalidated: false, error: 'Unknown path' }, { status: 400 });
  }

  revalidatePath(path);
  if (path === '/blog') {
    revalidatePath('/blog/[slug]', 'page');
  }

  return Response.json({ revalidated: true });
}
