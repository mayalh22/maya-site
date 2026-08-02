import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import { getPostBySlug } from '@/lib/posts';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="container">
      <div className="about">
        <h1>{post.title}</h1>
        {post.category && <h3>{post.category}</h3>}
        <p className="card-date">{post.date}</p>
      </div>

      <Section title="Post">
        <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{post.body}</p>
      </Section>

      <div className="about">
        <Link href="/writing" className="btn">Back to Writing</Link>
      </div>
    </main>
  );
}
