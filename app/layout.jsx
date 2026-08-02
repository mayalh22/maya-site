import '../styles/components.css';
import ClientEffects from './ClientEffects';
import Header from '@/components/Header';
import { getContentDoc } from '@/lib/firestore';
import { THEME_DOC_PATH, themeToCss } from '@/lib/theme';

export const metadata = {
  title: 'Maya Hazarika',
  description: 'My personal site!',
};

// Re-fetch site config (theme colors/text size) at most every 5 minutes
// instead of only baking it in at build time, so admin edits show up
// without a redeploy.
export const revalidate = 300;

const STAR_CHARS  = ['᯽', '✦', '☆'];
const STAR_COLORS = ['var(--orange)', 'var(--salmon)', 'var(--yellow)', 'var(--blue)'];
const FOOTER_STAR_COUNT = 30;

export default async function RootLayout({ children }) {
  const theme = await getContentDoc(THEME_DOC_PATH, null);

  return (
    <html lang="en">
      <body>
        {theme && <style dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />}
        <ClientEffects />
        <Header />
        {children}
        <footer>
          {Array.from({ length: FOOTER_STAR_COUNT }).map((_, i) => {
            const third = 100 / 3;
            const left = i < FOOTER_STAR_COUNT / 2
              ? ((i + 1) / (FOOTER_STAR_COUNT / 2 + 1)) * third
              : 100 - ((FOOTER_STAR_COUNT - i) / (FOOTER_STAR_COUNT / 2 + 1)) * third;
            const top = i % 2 === 0 ? 15 : 40;
            return (
              <span
                key={i}
                className="footer-star"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  color: STAR_COLORS[i % STAR_COLORS.length],
                }}
              />
            );
          })}
          <p>&copy; 2026 Maya Hazarika</p>
        </footer>
      </body>
    </html>
  );
}