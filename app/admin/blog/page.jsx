'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import { getUniqueSlug } from '@/lib/posts';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date' },
  { key: 'body', label: 'Body', type: 'textarea', required: true },
];

export default function BlogAdminPage() {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Blog</h2>
      </div>
      <div className="section-body">
        <CollectionEditor
          collectionName="posts"
          fields={FIELDS}
          itemLabel={(item) => item.title}
          emptyMessage="No posts yet."
          revalidatePath="/blog"
          deriveId={(form) => getUniqueSlug(form.title)}
        />
      </div>
    </div>
  );
}
