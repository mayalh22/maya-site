import Canvas from '@/components/canvas/Canvas';
import CanvasElement from '@/components/canvas/CanvasElement';

export const metadata = {
  title: 'Canvas sandbox',
  robots: { index: false, follow: false },
};

// Dev-only fixture for the Phase B canvas rendering primitive (see the plan
// at .claude/plans — Canva-style canvas foundation). Not linked from nav,
// not fetched from Firestore: just hand-written desktop/mobile positions to
// confirm the pure-CSS scale-to-fit and breakpoint switch both behave
// correctly before anything real is built on top of Canvas/CanvasElement.
const FIXTURES = [
  {
    id: 'heading',
    desktop: { x: 40, y: 40, w: 500, h: 60, z: 1 },
    mobile: { x: 20, y: 20, w: 380, h: 50, z: 1 },
    label: 'Heading block',
    tone: 'primary',
  },
  {
    id: 'image',
    desktop: { x: 40, y: 120, w: 360, h: 240, z: 1 },
    mobile: { x: 20, y: 90, w: 380, h: 200, z: 1 },
    label: 'Image block',
    tone: 'accent',
  },
  {
    id: 'card-a',
    desktop: { x: 440, y: 120, w: 260, h: 160, z: 2 },
    mobile: { x: 20, y: 310, w: 380, h: 140, z: 2 },
    label: 'Card A',
    tone: 'card',
  },
  {
    id: 'card-b',
    desktop: { x: 720, y: 120, w: 260, h: 160, z: 2 },
    mobile: { x: 20, y: 470, w: 380, h: 140, z: 2 },
    label: 'Card B',
    tone: 'card',
  },
  {
    id: 'overlap',
    desktop: { x: 600, y: 220, w: 200, h: 120, z: 3 },
    mobile: { x: 60, y: 380, w: 300, h: 100, z: 3 },
    label: 'Overlap check (should sit on top)',
    tone: 'overlap',
  },
];

const DESKTOP_HEIGHT = Math.max(...FIXTURES.map((f) => f.desktop.y + f.desktop.h)) + 40;
const MOBILE_HEIGHT = Math.max(...FIXTURES.map((f) => f.mobile.y + f.mobile.h)) + 40;

export default function CanvasSandboxPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Canvas sandbox</h1>
        <p>
          Resize the window (or use responsive dev tools) to confirm: the layout below scales smoothly between
          the two authored widths, snaps to the mobile arrangement under 768px, and the overlap box always
          renders above the cards behind it.
        </p>
      </div>
      <Canvas desktopWidth={1280} mobileWidth={420} desktopHeight={DESKTOP_HEIGHT} mobileHeight={MOBILE_HEIGHT}>
        {FIXTURES.map((f) => (
          <CanvasElement key={f.id} id={f.id} desktop={f.desktop} mobile={f.mobile}>
            <div className={`canvas-sandbox-box canvas-sandbox-${f.tone}`}>{f.label}</div>
          </CanvasElement>
        ))}
      </Canvas>
    </main>
  );
}
