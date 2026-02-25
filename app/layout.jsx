// app/layout.jsx
export const metadata = {
  title: 'Maya Hazarika',
  description: 'My personal site!',
};

import '../styles/colors.css';
import '../styles/layout.css';
import '../styles/components.css';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  React.useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerText = '𖦹';
    document.body.appendChild(cursor);
    let angle = 0;
    const moveCursor = e => {
      angle += 8;
      cursor.style.left = `${e.clientX - 20}px`;
      cursor.style.top = `${e.clientY - 20}px`;
      cursor.style.transform = `rotate(${angle}deg)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p>&copy; 2026 Maya Hazarika</p>
        </footer>
      </body>
    </html>
  );
}