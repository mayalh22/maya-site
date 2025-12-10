export const metadata = {
  title: 'Writing - Maya Hazarika',
  description: 'Writing by Maya Hazarika.',
};

import Header from '@/components/Header';
import writingData from '@/lib/content/writing.json';

export default function WritingPage() {
  return (
    <>
      <Header />

      <main className="container">
        {/* Intro */}
        <div className="about">
          <h1>Writing</h1>
          <p>{writingData.intro}</p>
        </div>

        {/* Writing categories */}
        {writingData.categories.map((category, index) => (
          <div key={index} className="section">
            <h2>{category.category}</h2>
            <p><em>{category.description}</em></p>

            <div className="card-grid">
              {category.pieces.map((piece, idx) => (
                <div key={idx} className="card">
                  <h3>{piece.title}</h3>
                  {piece.publication && <p><strong>{piece.publication}</strong></p>}
                  {piece.description && <p>{piece.description}</p>}
                  <p><small>{piece.date}</small></p>
                  {piece.link && piece.link !== '#' && (
                    <a
                      href={piece.link}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Article
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer>
        <p>&copy; 2025 Maya Hazarika</p>
      </footer>
    </>
  );
}
