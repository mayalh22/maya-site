export default function CroppedImage({
  src,
  alt,
  zoom,
  posX,
  posY,
  className,
  onClick,
  loading = 'lazy',
}) {
  if (!src) return null;

  return (
    <span className={className} onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        loading={loading}
        style={{
          transform: `scale(${zoom || 1})`,
          objectPosition: `${posX ?? 50}% ${posY ?? 50}%`,
        }}
      />
    </span>
  );
}
