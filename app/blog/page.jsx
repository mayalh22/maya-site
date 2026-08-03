import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
  description: 'Posts.',
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="container">
      <div className="about">
        <h1>Blog</h1>
      </div>

      {posts.length === 0 ? (
        <p className="empty-state">No posts yet.</p>
      ) : (
        <div className="card-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card">
              <h3 className="card-title">{post.title}</h3>
              {post.description && <p>{post.description}</p>}
              {post.date && <p className="card-date">{post.date}</p>}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
