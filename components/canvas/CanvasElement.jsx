// A single freely-positioned element on a Canvas. `desktop`/`mobile` are
// each `{x, y, w, h, z?}` in canvas px for that breakpoint; if `mobile` is
// omitted the desktop position is reused. Position data is written as CSS
// custom properties (computed server-side from Firestore data, so it's
// identical for SSR and CSR) and the stylesheet — not JS — picks which set
// applies via a media query, matching Canvas's breakpoint switch.
export default function CanvasElement({ id, desktop, mobile, className, children }) {
  const m = mobile || desktop;
  const style = {
    '--el-x-d': `${desktop.x}px`,
    '--el-y-d': `${desktop.y}px`,
    '--el-w-d': `${desktop.w}px`,
    '--el-h-d': `${desktop.h}px`,
    '--el-z-d': desktop.z ?? 0,
    '--el-x-m': `${m.x}px`,
    '--el-y-m': `${m.y}px`,
    '--el-w-m': `${m.w}px`,
    '--el-h-m': `${m.h}px`,
    '--el-z-m': m.z ?? 0,
  };

  return (
    <div className={`canvas-element ${className || ''}`.trim()} data-element-id={id} style={style}>
      {children}
    </div>
  );
}
