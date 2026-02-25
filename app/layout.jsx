import '../styles/colors.css';
import '../styles/layout.css';
import '../styles/components.css';
import ClientEffects from './ClientEffects';
import Header from '@/components/Header';

export const metadata = {
  title: 'Maya Hazarika',
  description: 'My personal site!',
};

const FOOTER_STAR_COUNT = 12;
const starColors = ['var(--orange)', 'var(--olive)', 'var(--yellow)', 'var(--pink)'];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientEffects />
        <Header />
        <main>{children}</main>
        <footer
          style={{
            position: 'relative',
            padding: '2rem 0',
            backgroundColor: 'var(--primary)',
            textAlign: 'center',
          }}
        >
          {/* Stars avoiding middle third */}
          {Array.from({ length: FOOTER_STAR_COUNT }).map((_, i) => {
            let leftPct;
            const third = 100 / 3;

            if (i < FOOTER_STAR_COUNT / 2) {
              // left third
              leftPct = ((i + 1) / (FOOTER_STAR_COUNT / 2 + 1)) * third;
            } else {
              // right third
              leftPct = 100 - ((FOOTER_STAR_COUNT - i) / (FOOTER_STAR_COUNT / 2 + 1)) * third;
            }

            const topPct = i % 2 === 0 ? 15 : 40; // alternate vertical position
            return (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  fontSize: '1rem',
                  color: starColors[i % starColors.length],
                  top: `${topPct}%`,
                  left: `${leftPct}%`,
                }}
              >
                ★
              </span>
            );
          })}

          <p style={{ position: 'relative', zIndex: 1 }}>
            <small>&copy; 2026 Maya Hazarika</small>
          </p>
        </footer>
      </body>
    </html>
  );
}