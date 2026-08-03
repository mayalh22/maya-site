import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="container">
      <div className="about">
        <h1>{post.title}</h1>
        {post.category && <h3>{post.category}</h3>}
        {post.date && <p className="card-date">{post.date}</p>}
      </div>

      <div className="section-wrapper">
        <div className="section-body post-body">
          {post.body.split('\n').map((paragraph, index) => (paragraph.trim() ? <p key={index}>{paragraph}</p> : null))}
        </div>
      </div>

      <div className="about">
        <Link href="/blog" className="btn">Back to blog</Link>
      </div>
    </main>
  );
}
