'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getContentDoc } from '@/lib/firestore';
import { updateAt, removeAt } from '@/lib/adminList';
import timelineFallback from '@/lib/content/timeline.json';
import {
  TIMELINE_DOC_PATH,
  emptyEvent,
  emptySection,
  emptyRole,
  emptyAward,
} from '@/lib/timeline';

function TextField({ label, value, onChange, textarea }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="admin-field">
      <label>{label}</label>
      <Tag type={textarea ? undefined : 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default function TimelineAdminPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getContentDoc(TIMELINE_DOC_PATH, timelineFallback).then((loaded) => {
      if (!cancelled) setData(loaded);
    });
    return () => { cancelled = true; };
  }, []);

  if (!data) {
    return (
      <div className="section-wrapper">
        <div className="section-header"><h2>Timeline</h2></div>
        <div className="section-body"><p>Loading current timeline…</p></div>
      </div>
    );
  }

  const updateSection = (sIdx, patch) =>
    setData((d) => ({ ...d, sections: updateAt(d.sections, sIdx, patch) }));
  const removeSection = (sIdx) =>
    setData((d) => ({ ...d, sections: removeAt(d.sections, sIdx) }));
  const addSection = () =>
    setData((d) => ({ ...d, sections: [...d.sections, emptySection()] }));

  const updateEvent = (sIdx, eIdx, patch) => {
    const events = updateAt(data.sections[sIdx].events, eIdx, patch);
    updateSection(sIdx, { events });
  };
  const removeEvent = (sIdx, eIdx) => {
    const events = removeAt(data.sections[sIdx].events, eIdx);
    updateSection(sIdx, { events });
  };
  const addEvent = (sIdx) => {
    updateSection(sIdx, { events: [...data.sections[sIdx].events, emptyEvent()] });
  };

  const updateRole = (idx, patch) =>
    setData((d) => ({ ...d, volunteering: { ...d.volunteering, roles: updateAt(d.volunteering.roles, idx, patch) } }));
  const removeRole = (idx) =>
    setData((d) => ({ ...d, volunteering: { ...d.volunteering, roles: removeAt(d.volunteering.roles, idx) } }));
  const addRole = () =>
    setData((d) => ({ ...d, volunteering: { ...d.volunteering, roles: [...d.volunteering.roles, emptyRole()] } }));

  const honors = data.honors || { title: 'Honors & Awards', awards: [] };
  const updateAward = (idx, patch) =>
    setData((d) => ({ ...d, honors: { ...honors, awards: updateAt(honors.awards, idx, patch) } }));
  const removeAward = (idx) =>
    setData((d) => ({ ...d, honors: { ...honors, awards: removeAt(honors.awards, idx) } }));
  const addAward = () =>
    setData((d) => ({ ...d, honors: { ...honors, awards: [...honors.awards, emptyAward()] } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(doc(db, TIMELINE_DOC_PATH), { ...data, honors });
      setStatus({ type: 'success', message: 'Saved. Changes may take a few minutes to appear on the live site.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Timeline</h2></div>
      <div className="section-body">
        <form className="admin-form" onSubmit={handleSave} style={{ maxWidth: '100%' }}>
          <TextField label="Intro" value={data.intro} onChange={(v) => setData((d) => ({ ...d, intro: v }))} textarea />

          <h3>Sections & events</h3>
          {data.sections.map((section, sIdx) => (
            <div className="admin-subcard" key={sIdx}>
              <div className="admin-subcard-header">
                <h4>Section {sIdx + 1}</h4>
                <button type="button" className="admin-remove-btn" onClick={() => removeSection(sIdx)}>Remove section</button>
              </div>
              <div className="admin-field-row">
                <TextField label="Year range" value={section.year} onChange={(v) => updateSection(sIdx, { year: v })} />
                <TextField label="Section title" value={section.title} onChange={(v) => updateSection(sIdx, { title: v })} />
              </div>

              {section.events.map((event, eIdx) => (
                <div className="admin-subcard" key={eIdx}>
                  <div className="admin-subcard-header">
                    <h4>Event {eIdx + 1}</h4>
                    <button type="button" className="admin-remove-btn" onClick={() => removeEvent(sIdx, eIdx)}>Remove event</button>
                  </div>
                  <div className="admin-field-row">
                    <TextField label="Date" value={event.date} onChange={(v) => updateEvent(sIdx, eIdx, { date: v })} />
                    <TextField label="Role" value={event.role} onChange={(v) => updateEvent(sIdx, eIdx, { role: v })} />
                  </div>
                  <div className="admin-field-row">
                    <TextField label="Organization" value={event.organization} onChange={(v) => updateEvent(sIdx, eIdx, { organization: v })} />
                    <TextField label="Location" value={event.location} onChange={(v) => updateEvent(sIdx, eIdx, { location: v })} />
                  </div>
                  <TextField label="Description" value={event.description} onChange={(v) => updateEvent(sIdx, eIdx, { description: v })} textarea />
                </div>
              ))}
              <button type="button" className="btn" onClick={() => addEvent(sIdx)}>Add event to this section</button>
            </div>
          ))}
          <button type="button" className="btn" onClick={addSection}>Add section</button>

          <h3>{data.volunteering.title}</h3>
          <TextField
            label="Section title"
            value={data.volunteering.title}
            onChange={(v) => setData((d) => ({ ...d, volunteering: { ...d.volunteering, title: v } }))}
          />
          {data.volunteering.roles.map((role, idx) => (
            <div className="admin-subcard" key={idx}>
              <div className="admin-subcard-header">
                <h4>Role {idx + 1}</h4>
                <button type="button" className="admin-remove-btn" onClick={() => removeRole(idx)}>Remove</button>
              </div>
              <div className="admin-field-row">
                <TextField label="Organization" value={role.organization} onChange={(v) => updateRole(idx, { organization: v })} />
                <TextField label="Role" value={role.role} onChange={(v) => updateRole(idx, { role: v })} />
              </div>
              <div className="admin-field-row">
                <TextField label="Date" value={role.date} onChange={(v) => updateRole(idx, { date: v })} />
                <TextField label="Category" value={role.category} onChange={(v) => updateRole(idx, { category: v })} />
              </div>
              <TextField label="Description" value={role.description} onChange={(v) => updateRole(idx, { description: v })} textarea />
            </div>
          ))}
          <button type="button" className="btn" onClick={addRole}>Add volunteer role</button>

          <h3>{honors.title}</h3>
          <TextField
            label="Section title"
            value={honors.title}
            onChange={(v) => setData((d) => ({ ...d, honors: { ...honors, title: v } }))}
          />
          {honors.awards.map((award, idx) => (
            <div className="admin-subcard" key={idx}>
              <div className="admin-subcard-header">
                <h4>Award {idx + 1}</h4>
                <button type="button" className="admin-remove-btn" onClick={() => removeAward(idx)}>Remove</button>
              </div>
              <div className="admin-field-row">
                <TextField label="Title" value={award.title} onChange={(v) => updateAward(idx, { title: v })} />
                <TextField label="Issuer" value={award.issuer} onChange={(v) => updateAward(idx, { issuer: v })} />
              </div>
              <TextField label="Date" value={award.date} onChange={(v) => updateAward(idx, { date: v })} />
              <TextField label="Description" value={award.description} onChange={(v) => updateAward(idx, { description: v })} textarea />
            </div>
          ))}
          <button type="button" className="btn" onClick={addAward}>Add award</button>

          <div className="admin-actions">
            <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving…' : 'Save timeline'}</button>
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
