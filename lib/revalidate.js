export async function revalidatePublicPath(path) {
  if (!path) return;
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
  } catch {
    // best effort; the ISR window still catches this
  }
}
