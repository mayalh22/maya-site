import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import EditableText from '@/components/editing/EditableText';

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

  const target = { type: 'item', collection: 'posts', id: slug };

  return (
    <main className="container">
      <div className="about">
        <EditableText
          as="h1"
          value={post.title}
          align={post.titleAlign}
          fieldKey="title"
          target={target}
          revalidateTarget="/blog"
          placeholder="Title"
        />
        <EditableText
          as="h3"
          value={post.category}
          align={post.categoryAlign}
          fieldKey="category"
          target={target}
          revalidateTarget="/blog"
          placeholder="Add a category…"
        />
        <EditableText
          as="p"
          className="card-date"
          value={post.date}
          fieldKey="date"
          target={target}
          revalidateTarget="/blog"
          placeholder="Add a date…"
        />
      </div>

      <div className="section-wrapper">
        <div className="section-body post-body">
          <EditableText
            as="div"
            value={post.body}
            align={post.bodyAlign}
            fieldKey="body"
            multiline
            target={target}
            revalidateTarget="/blog"
            placeholder="Write the post body…"
            formatDisplay={(v) =>
              (v || '').split('\n').map((paragraph, index) => (paragraph.trim() ? <p key={index}>{paragraph}</p> : null))
            }
          />
        </div>
      </div>

      <div className="about">
        <Link href="/blog" className="btn">
          Back to blog
        </Link>
      </div>
    </main>
  );
}
