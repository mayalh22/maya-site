// Legacy gallery entries store a bare relative path like "art/art1.png"
// (resolved against /public/assets). Images uploaded through the admin
// panel store a full Firebase Storage URL instead. This resolves either.
export function resolveAssetSrc(path) {
  if (!path) return path;
  return path.startsWith('http') || path.startsWith('/') ? path : `/assets/${path}`;
}
