import writingData from '@/lib/content/writing.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';

export const metadata = {
  title: 'Writing',
  description: 'Writing works.',
};

export default function WritingPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Writing</h1>
        <p>{writingData.intro}</p>
      </div>

      {writingData.categories.map((category, index) => (
        <Section key={index} title={category.category} subtitle={category.description}>
          <div className="card-grid">
            {category.pieces.map((piece, idx) => (
              <div
                key={idx}
                className={getCardClass(idx)}
                style={{ backgroundColor: getCardColor(idx) }}
              >
                <h3>{piece.title}</h3>
                {piece.publication && <p>{piece.publication}</p>}
                {piece.description && <p>{piece.description}</p>}
                <p className="card-date">{piece.date}</p>
                {piece.link && piece.link !== '#' && (
                  <a href={piece.link} className="btn" target="_blank" rel="noopener noreferrer">
                    Read Article
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}