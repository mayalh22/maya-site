'use client';

import Link from 'next/link';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { getUniqueSlug } from '@/lib/posts';

const CREATE_FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date' },
  { key: 'body', label: 'Body', type: 'textarea', required: true },
];

const EXTRA_FIELDS = [
  { key: 'category', label: 'Category' },
  { key: 'body', label: 'Body', type: 'textarea', required: true },
];

export default function BlogList({ posts: initialPosts }) {
  const { isOwner } = useAdminUser();
  const seeded = (initialPosts || []).map((p) => ({ ...p, id: p.slug }));
  const { items, patchItem, createItem, deleteItem } = useOwnerCollection('posts', {
    initialItems: seeded,
    revalidateTarget: '/blog',
    deriveId: (data) => getUniqueSlug(data.title),
  });
  const list = items || [];

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No posts yet.</p>;
  }

  return (
    <div className="card-grid">
      {list.map((post) => {
        const target = { type: 'item', collection: 'posts', id: post.id };
        const inner = (
          <>
            <EditableText
              as="h3"
              className="card-title"
              value={post.title}
              font={post.titleFont}
              fieldKey="title"
              target={target}
              revalidateTarget="/blog"
              placeholder="Title"
            />
            <EditableText
              as="p"
              value={post.description}
              font={post.descriptionFont}
              fieldKey="description"
              multiline
              target={target}
              revalidateTarget="/blog"
              placeholder="Add a description…"
            />
            <EditableText
              as="p"
              className="card-date"
              value={post.date}
              fieldKey="date"
              target={target}
              revalidateTarget="/blog"
              placeholder="Add a date…"
              allowFont={false}
            />
          </>
        );

        if (!isOwner) {
          return (
            <Link key={post.id} href={`/blog/${post.id}`} className="card">
              {inner}
            </Link>
          );
        }

        return (
          <div key={post.id} className="card">
            {inner}
            <Link href={`/blog/${post.id}`} className="btn btn-small">
              View post →
            </Link>
            <ItemEditPanel
              fields={EXTRA_FIELDS}
              initial={post}
              collectionName="posts"
              itemId={post.id}
              triggerLabel="✎ Edit body"
              onSubmit={(form) => patchItem(post.id, form)}
              onDelete={() => deleteItem(post.id)}
            />
          </div>
        );
      })}
      {isOwner && (
        <div className="card add-item-card">
          <ItemEditPanel
            fields={CREATE_FIELDS}
            initial={{}}
            collectionName="posts"
            triggerLabel="+ Add post"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}
    </div>
  );
}
