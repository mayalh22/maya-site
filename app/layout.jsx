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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p>&copy; 2025 Maya Hazarika</p>
        </footer>
      </body>
    </html>
  );
}