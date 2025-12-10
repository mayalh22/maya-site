import '../styles/main.css';
import '../styles/colors.css';
import '../styles/components.css';
import '../styles/layout.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
