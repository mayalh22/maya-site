'use client';

import { useSingletonDoc } from '@/lib/useSingletonDoc';
import CollectionEditor from '@/components/admin/CollectionEditor';
import { SHAPE_FIELD } from '@/lib/shape';

const DEFAULTS = { email: '', message: '', closingMessage: '' };

const SOCIAL_FIELDS = [
  { key: 'platform', label: 'Platform', required: true },
  { key: 'username', label: 'Username' },
  { key: 'url', label: 'URL', type: 'text', required: true },
  { key: 'description', label: 'Description' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function ContactAdminPage() {
  const { data, setField, save, loading, saving, status } = useSingletonDoc('siteContent/contact', DEFAULTS, '/contact');

  return (
    <>
      <div className="section-wrapper">
        <div className="section-header">
          <h2>Contact</h2>
        </div>
        <div className="section-body">
          {loading ? (
            <p className="admin-loading">Loading…</p>
          ) : (
            <form
              className="admin-form"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <div className="admin-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={data.email} onChange={(e) => setField('email', e.target.value)} />
              </div>
              <div className="admin-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" value={data.message} onChange={(e) => setField('message', e.target.value)} />
              </div>
              <div className="admin-field">
                <label htmlFor="closingMessage">Closing message</label>
                <textarea
                  id="closingMessage"
                  value={data.closingMessage}
                  onChange={(e) => setField('closingMessage', e.target.value)}
                />
              </div>
              <div className="admin-actions">
                <button type="submit" className="btn" disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
              {status && (
                <p
                  className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}
                >
                  {status.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-header">
          <h2>Social links</h2>
        </div>
        <div className="section-body">
          <CollectionEditor
            collectionName="social"
            fields={SOCIAL_FIELDS}
            itemLabel={(item) => item.platform}
            itemDetail={(item) => item.username}
            emptyMessage="No social links yet."
            revalidatePath="/contact"
            reorderable
          />
        </div>
      </div>
    </>
  );
}
