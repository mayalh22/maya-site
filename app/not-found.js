export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>

      <main className="container">
        <div className="about">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <a href="/" className="btn">Go Home</a>
        </div>
      </main>
    </>
  );
}
