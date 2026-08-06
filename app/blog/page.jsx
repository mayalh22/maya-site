import { getAllPosts } from '@/lib/posts';
import BlogList from './BlogList';

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

      <BlogList posts={posts} />
    </main>
  );
}
