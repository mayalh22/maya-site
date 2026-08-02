import Link from 'next/link';
import writingData from '@/lib/content/writing.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Writing',
  description: 'Writing works.',
};

export const revalidate = 300;

function mergePostsIntoCategories(categories, posts) {
  const merged = categories.map((category) => ({ ...category, pieces: [...category.pieces] }));

  for (const post of posts) {
    let category = merged.find((c) => c.category === post.category);
    if (!category) {
      category = { category: post.category || 'Blog', description: '', pieces: [] };
      merged.push(category);
    }
    category.pieces.unshift({
      title: post.title,
      description: post.description,
      date: post.date,
      slug: post.slug,
    });
  }

  return merged;
}

export default async function WritingPage() {
  const posts = await getAllPosts();
  const categories = mergePostsIntoCategories(writingData.categories, posts);

  return (
    <main className="container">
      <div className="about">
        <h1>Writing</h1>
        <p>{writingData.intro}</p>
      </div>

      {categories.map((category, index) => (
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
                {piece.slug ? (
                  <Link href={`/writing/${piece.slug}`} className="btn">Read Post</Link>
                ) : (
                  piece.link && piece.link !== '#' && (
                    <a href={piece.link} className="btn" target="_blank" rel="noopener noreferrer">
                      Read Article
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}
