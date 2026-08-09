// Page-level freeform canvas container. Renders its children (CanvasElement
// instances) inside a fixed-design-width box that scales — via pure CSS,
// no client measurement — to fit whatever viewport width a visitor actually
// has, the way zooming a Canva design in or out preserves the composition.
// Desktop and mobile are two independently authored layouts; which one is
// active is decided entirely by a CSS media query, so it's correct on first
// paint for both SSR and CSR with no flash and no hydration mismatch.
//
// `desktopWidth`/`mobileWidth` are the authored canvas widths (px). Height
// is not authored — pass the actual computed extent of your elements
// (max(element.y + element.h) across all of them, plus any bottom padding)
// as `desktopHeight`/`mobileHeight` so the page's normal document flow
// (e.g. the footer) continues in the right place after the canvas.
export default function Canvas({
  desktopWidth = 1280,
  mobileWidth = 420,
  desktopHeight,
  mobileHeight,
  className,
  children,
}) {
  const style = {
    '--canvas-desktop-width': `${desktopWidth}px`,
    '--canvas-mobile-width': `${mobileWidth}px`,
    '--canvas-desktop-height': `${desktopHeight}px`,
    '--canvas-mobile-height': `${mobileHeight ?? desktopHeight}px`,
  };

  return (
    <div className={`canvas-viewport ${className || ''}`.trim()} style={style}>
      <div className="canvas">{children}</div>
    </div>
  );
}
