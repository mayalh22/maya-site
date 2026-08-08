import { Inter, Lora, Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import '../styles/components.css';
import Header from '@/components/Header';
import CustomCursor from '@/components/CustomCursor';
import OwnerStrip from '@/components/editing/OwnerStrip';
import SiteThemeWidget from '@/components/editing/SiteThemeWidget';
import { getSingleton } from '@/lib/db';
import { THEME_DOC_PATH, themeToCss } from '@/lib/theme';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const elegant = Playfair_Display({ subsets: ['latin'], variable: '--font-elegant', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const FONT_VARS = [sans, serif, display, elegant, mono].map((f) => f.variable).join(' ');

const STAR_CHARS = ['᯽', '✦', '☆'];
const FOOTER_STAR_COUNT = 24;

export const metadata = {
  title: 'Maya Hazarika',
  description: 'Personal site.',
};

export const revalidate = 300;

export default async function RootLayout({ children }) {
  const theme = await getSingleton(THEME_DOC_PATH, null);

  return (
    <html lang="en" className={FONT_VARS}>
      <body>
        {theme && <style dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />}
        <CustomCursor />
        <OwnerStrip />
        <Header />
        {children}
        <SiteThemeWidget />
        <footer>
          <div className="footer-stars" aria-hidden="true">
            {Array.from({ length: FOOTER_STAR_COUNT }).map((_, i) => (
              <span
                key={i}
                className="footer-star"
                style={{
                  left: `${(i / FOOTER_STAR_COUNT) * 100}%`,
                  top: i % 2 === 0 ? '15%' : '55%',
                  animationDelay: `${(i % 6) * 0.4}s`,
                }}
              >
                {STAR_CHARS[i % STAR_CHARS.length]}
              </span>
            ))}
          </div>
          <p>&copy; {new Date().getFullYear()} Maya Hazarika</p>
        </footer>
      </body>
    </html>
  );
}
