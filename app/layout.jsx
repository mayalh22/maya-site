export const metadata = {
  title: 'Maya Hazarika',
  description: 'Personal website of Maya Hazarika',
};

import '../styles/main.css';
import '../styles/colors.css';
import '../styles/components.css';
import '../styles/layout.css';

import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
