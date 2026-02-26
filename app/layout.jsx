
import '../styles/components.css';
import ClientEffects from './ClientEffects';
import Header from '@/components/Header';

export const metadata = {
  title: 'Maya Hazarika',
  description: 'My personal site!',
};

// Footer star constants
const STAR_CHARS = ['᯽', '✦', '☆'];
const FOOTER_STAR_COUNT = 30;
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
            padding: '0.1rem 0',
            backgroundColor: 'var(--primary)',
            textAlign: 'center',
            overflow: 'hidden', // keep stars contained
          }}
        >
          {/* Spinning stars in footer */}
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .footer-star {
              position: absolute;
              font-size: 1rem;
              animation: spin 3s linear infinite;
              transform-origin: center center;
            }
            .footer-star:hover {
              animation-play-state: paused;
              transform: scale(1.5) rotate(0deg);
            }
          `}</style>

          {Array.from({ length: FOOTER_STAR_COUNT }).map((_, i) => {
            // spread stars evenly across left & right thirds, avoiding center
            const third = 100 / 3;
            const leftPct =
              i < FOOTER_STAR_COUNT / 2
                ? ((i + 1) / (FOOTER_STAR_COUNT / 2 + 1)) * third
                : 100 - ((FOOTER_STAR_COUNT - i) / (FOOTER_STAR_COUNT / 2 + 1)) * third;

            const topPct = i % 2 === 0 ? 15 : 40;

            return (
              <span
                key={i}
                className="footer-star"
                style={{
                  top: `${topPct}%`,
                  left: `${leftPct}%`,
                  color: starColors[i % starColors.length],
                }}
              >
{STAR_CHARS[i % STAR_CHARS.length]}              </span>
            );
          })}

          <p style={{ position: 'relative', zIndex: 1 }}>
            &copy; 2026 Maya Hazarika
          </p>
        </footer>
      </body>
    </html>
  );
}