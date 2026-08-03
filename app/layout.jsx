import { Inter, Lora } from 'next/font/google';
import '../styles/components.css';
import Header from '@/components/Header';
import { getSingleton } from '@/lib/db';
import { THEME_DOC_PATH, themeToCss } from '@/lib/theme';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Lora({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

export const metadata = {
  title: 'Maya Hazarika',
  description: 'Personal site.',
};

export const revalidate = 300;

export default async function RootLayout({ children }) {
  const theme = await getSingleton(THEME_DOC_PATH, null);

  return (
    <html lang="en" data-font={theme?.fontChoice === 'serif' ? 'serif' : 'sans'} className={`${sans.variable} ${serif.variable}`}>
      <body>
        {theme && <style dangerouslySetInnerHTML={{ __html: themeToCss(theme) }} />}
        <Header />
        {children}
        <footer>
          <p>&copy; {new Date().getFullYear()} Maya Hazarika</p>
        </footer>
      </body>
    </html>
  );
}
