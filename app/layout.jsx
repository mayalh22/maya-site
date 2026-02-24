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
  return (
    <html lang="en">
<head>
  <meta charSet="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
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