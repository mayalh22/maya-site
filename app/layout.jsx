// app/layout.jsx
export const metadata = {
  title: 'Maya Hazarika',
  description: 'Personal website of Maya Hazarika',
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