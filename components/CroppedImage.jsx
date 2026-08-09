import Image from 'next/image';

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
  priority = false,
  sizes = '(max-width: 768px) 45vw, 320px',
}) {
  if (!src) return null;

  const zx = zoomX ?? zoom ?? 1;
  const zy = zoomY ?? zoom ?? 1;

  return (
    <span
      className={className}
      style={{ position: 'relative', '--dim-w': sizeW ?? 1, '--dim-h': sizeH ?? 1, ...style }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes={sizes}
        loading={priority ? undefined : loading}
        priority={priority}
        style={{
          transform: `scale(${zx}, ${zy})`,
          objectPosition: `${posX ?? 50}% ${posY ?? 50}%`,
        }}
      />
    </span>
  );
}
