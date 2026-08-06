export default function CroppedImage({
  src,
  alt,
  zoom,
  zoomX,
  zoomY,
  posX,
  posY,
  sizeW,
  sizeH,
  className,
  style,
  onClick,
  loading = 'lazy',
}) {
  if (!src) return null;

  const zx = zoomX ?? zoom ?? 1;
  const zy = zoomY ?? zoom ?? 1;

  return (
    <span
      className={className}
      style={{ '--dim-w': sizeW ?? 1, '--dim-h': sizeH ?? 1, ...style }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        loading={loading}
        style={{
          transform: `scale(${zx}, ${zy})`,
          objectPosition: `${posX ?? 50}% ${posY ?? 50}%`,
        }}
      />
    </span>
  );
}
