'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export default function AttachmentsField({ id, value, onChange, collectionName, itemId }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const attachments = value || [];

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const path = `attachments/${collectionName}/${itemId || 'new'}-${Date.now()}/${file.name}`;
          const fileRef = ref(storage, path);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          return { url, name: file.name, contentType: file.type, size: file.size };
        })
      );
      onChange([...attachments, ...uploaded]);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function removeAttachment(index) {
    onChange(attachments.filter((_, i) => i !== index));
  }

  return (
    <div className="attachments-field">
      {attachments.length > 0 && (
        <div className="admin-list">
          {attachments.map((att, index) => (
            <div className="admin-list-item" key={`${att.url}-${index}`}>
              {att.contentType?.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="admin-list-thumb" src={att.url} alt="" loading="lazy" />
              ) : (
                <span className="attachment-file-icon" aria-hidden="true">FILE</span>
              )}
              <div className="admin-list-info">
                <p className="admin-list-detail">{att.name}</p>
              </div>
              <div className="admin-list-actions">
                <button type="button" className="btn btn-small btn-danger" onClick={() => removeAttachment(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="file-input">
        <input id={id} className="file-input-native" type="file" multiple onChange={handleFiles} disabled={uploading} />
        <label htmlFor={id} className="btn btn-small btn-secondary file-input-label">
          {uploading ? 'Uploading…' : 'Choose files'}
        </label>
      </div>
      {uploading && <p className="admin-status">Uploading…</p>}
      {error && <p className="admin-status admin-status-error">{error}</p>}
    </div>
  );
}
