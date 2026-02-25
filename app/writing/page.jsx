export const metadata = {
  title: 'Writing',
  description: 'Writing works.',
};

import writingData from '@/lib/content/writing.json';

export default function WritingPage() {
  return (
    <main className="container writing">
      <div className="about">
        <h1>Writing</h1>
        <p>{writingData.intro}</p>
      </div>

      {writingData.categories.map((category, index) => (
        <div
          key={index}
          className="section"
          style={{
            background: 'repeating-linear-gradient(135deg, var(--yellow) 0 2px, transparent 2px 24px), repeating-linear-gradient(45deg, var(--pink) 0 2px, transparent 2px 24px)',
            backgroundSize: '24px 24px',
            backgroundColor: '#fff',
          }}
        >
          {/* Uniform heading color for all categories */}
          <h2>{category.category}</h2>

          <p><em>{category.description}</em></p>

          <div className="card-grid">
            {category.pieces.map((piece, idx) => (
              <div key={idx} className="card">
                <h3>{piece.title}</h3>
                {piece.publication && <p style={{ fontWeight: 'normal' }}>{piece.publication}</p>}
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
  );
}