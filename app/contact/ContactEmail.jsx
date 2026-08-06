'use client';

import { useAdminUser } from '@/lib/auth';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { persistPatch } from '@/lib/editingPersist';

const CONTENT_PATH = 'siteContent/contact';

export default function ContactEmail({ email }) {
  const { isOwner } = useAdminUser();

  if (!isOwner) {
    return email ? (
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    ) : null;
  }

  return (
    <p>
      {email && <a href={`mailto:${email}`}>{email}</a>}{' '}
      <ItemEditPanel
        fields={[{ key: 'email', label: 'Email', type: 'text' }]}
        initial={{ email: email || '' }}
        triggerLabel={email ? '✎ Edit email' : '+ Add email'}
        triggerClassName="btn btn-small btn-secondary"
        submitLabel="Save"
        onSubmit={(form) => persistPatch({ type: 'singleton', path: CONTENT_PATH }, { email: form.email }, '/contact')}
      />
    </p>
  );
}
