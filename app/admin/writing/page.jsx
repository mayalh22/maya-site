'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAllPosts, getUniqueSlug } from '@/lib/posts';

const EMPTY_FORM = { title: '', category: '', description: '', date: '', body: '' };

export default function WritingAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState(null); // null = creating new
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadPosts = () => {
    setLoading(true);
    getAllPosts().then((loaded) => {
      setPosts(loaded);
      setLoading(false);
    });
  };

  useEffect(loadPosts, []);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const startNewPost = () => {
    setEditingSlug(null);
    setForm(EMPTY_FORM);
    setStatus(null);
  };

  const startEditPost = (post) => {
    setEditingSlug(post.slug);
    setForm({
      title: post.title || '',
      category: post.category || '',
      description: post.description || '',
      date: post.date || '',
      body: post.body || '',
    });
    setStatus(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const slug = editingSlug || (await getUniqueSlug(form.title));
      const existing = posts.find((p) => p.slug === slug);
      await setDoc(doc(db, 'posts', slug), {
        ...form,
        createdAt: existing?.createdAt || serverTimestamp(),
      });
      setStatus({ type: 'success', message: `Saved "${form.title}".` });
      setEditingSlug(slug);
      loadPosts();
    } catch (err) {
      setStatus({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug) => {
    setSaving(true);
    try {
      await deleteDoc(doc(db, 'posts', slug));
      if (editingSlug === slug) startNewPost();
      loadPosts();
    } catch (err) {
      setStatus({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Writing / Blog posts</h2></div>
      <div className="section-body">
        <h3>Existing posts</h3>
        {loading ? (
          <p>Loading posts…</p>
        ) : posts.length === 0 ? (
          <p>No posts yet — create your first one below.</p>
        ) : (
          posts.map((post) => (
            <div className="admin-list-item" key={post.slug}>
              <span>{post.title} <small>({post.category || 'Uncategorized'})</small></span>
              <div className="admin-actions">
                <button type="button" className="btn" onClick={() => startEditPost(post)} disabled={saving}>Edit</button>
                <button type="button" className="admin-remove-btn" onClick={() => handleDelete(post.slug)} disabled={saving}>Delete</button>
              </div>
            </div>
          ))
        )}

        <h3>{editingSlug ? `Editing: ${form.title}` : 'New post'}</h3>
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-field">
            <label>Title</label>
            <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Journalism, Creative Writing, Blog…"
              />
            </div>
            <div className="admin-field">
              <label>Date</label>
              <input type="text" value={form.date} onChange={(e) => updateField('date', e.target.value)} placeholder="e.g. March 2026" />
            </div>
          </div>
          <div className="admin-field">
            <label>Short description</label>
            <input type="text" value={form.description} onChange={(e) => updateField('description', e.target.value)} />
          </div>
          <div className="admin-field">
            <label>Body</label>
            <textarea value={form.body} onChange={(e) => updateField('body', e.target.value)} style={{ minHeight: '280px' }} />
          </div>

          <div className="admin-actions">
            <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : editingSlug ? 'Save changes' : 'Publish post'}</button>
            {editingSlug && <button type="button" className="btn" onClick={startNewPost} disabled={saving}>Start new post</button>}
          </div>
          {status && (
            <p className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
