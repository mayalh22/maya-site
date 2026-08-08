'use client';

import { Fragment } from 'react';
import Section from '@/components/Section';
import AttachmentList from '@/components/AttachmentList';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { shapeClassName, SHAPE_FIELD } from '@/lib/shape';

const SECTIONS = [
  { kind: 'experience', title: 'Experience' },
  { kind: 'volunteering', title: 'Volunteering' },
  { kind: 'honor', title: 'Honors' },
];

const KIND_OPTIONS = [
  { value: 'experience', label: 'Experience' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'honor', label: 'Honor' },
];

const CREATE_FIELDS = [
  { key: 'kind', label: 'Kind', type: 'select', required: true, options: KIND_OPTIONS },
  { key: 'title', label: 'Title', required: true },
  { key: 'organization', label: 'Organization' },
  { key: 'startDate', label: 'Date started', type: 'month', required: true },
  { key: 'endDate', label: 'Date ended', type: 'month' },
  { key: 'location', label: 'Location' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

const EXTRA_FIELDS = [
  { key: 'kind', label: 'Kind', type: 'select', required: true, options: KIND_OPTIONS },
  { key: 'location', label: 'Location' },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

function sortKey(entry) {
  return entry.startDate || entry.date || '';
}

function DateRange({ event, target, isOwner }) {
  return (
    <>
      <EditableText
        as="span"
        value={event.startDate}
        fieldKey="startDate"
        type="month"
        target={target}
        revalidateTarget="/timeline"
        allowFont={false}
        placeholder="Start date"
      />
      {' – '}
      {isOwner ? (
        <EditableText
          as="span"
          value={event.endDate}
          fieldKey="endDate"
          type="month"
          target={target}
          revalidateTarget="/timeline"
          allowFont={false}
          placeholder="Present"
        />
      ) : (
        <span>{event.endDate || 'Present'}</span>
      )}
    </>
  );
}

export default function TimelineSections({ entries: initialEntries, layout }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem, clearAll, busy } = useOwnerCollection('timeline', {
    initialItems: initialEntries,
    revalidateTarget: '/timeline',
  });
  const list = items || [];
  const sorted = [...list].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

  async function handleClearAll() {
    if (!window.confirm(`Delete all ${list.length} timeline entries? This can't be undone.`)) return;
    await clearAll();
  }

  return (
    <>
      {isOwner && list.length > 0 && (
        <div className="about">
          <button type="button" className="btn btn-small btn-danger" onClick={handleClearAll} disabled={busy}>
            Clear all entries
          </button>
        </div>
      )}

      {SECTIONS.map(({ kind, title }) => {
        const kindItems = sorted.filter((entry) => entry.kind === kind);
        if (kindItems.length === 0 && !isOwner) return null;

        return (
          <Section key={kind} title={title}>
            {kindItems.length === 0 ? (
              <p className="empty-state">No entries yet.</p>
            ) : kind === 'experience' ? (
              <GridLayoutEditor
                sectionKey={`timeline-${kind}`}
                defaultGap={24}
                defaultItemWidth={260}
                initial={layout?.[`timeline-${kind}`]}
                revalidateTarget="/timeline"
              >
                <div className="timeline-track">
                  {kindItems.map((event, index) => {
                    const target = { type: 'item', collection: 'timeline', id: event.id };
                    return (
                      <Fragment key={event.id}>
                        <div className="timeline-item">
                          <p className="timeline-date">
                            <DateRange event={event} target={target} isOwner={isOwner} />
                          </p>
                          <h3>
                            <EditableText
                              as="span"
                              value={event.title}
                              font={event.titleFont}
                              fieldKey="title"
                              target={target}
                              revalidateTarget="/timeline"
                              placeholder="Title"
                            />
                            {(event.organization || isOwner) && <span> at </span>}
                            <EditableText
                              as="span"
                              value={event.organization}
                              font={event.organizationFont}
                              fieldKey="organization"
                              target={target}
                              revalidateTarget="/timeline"
                              placeholder="Organization"
                            />
                          </h3>
                          {event.location && <p><em>{event.location}</em></p>}
                          <EditableText
                            as="p"
                            value={event.description}
                            font={event.descriptionFont}
                            fieldKey="description"
                            multiline
                            target={target}
                            revalidateTarget="/timeline"
                            placeholder="Add a description…"
                          />
                          {event.siteUrl && (
                            <a href={event.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                              Visit site
                            </a>
                          )}
                          <AttachmentList attachments={event.attachments} />
                          {isOwner && (
                            <ItemEditPanel
                              fields={EXTRA_FIELDS}
                              initial={event}
                              collectionName="timeline"
                              itemId={event.id}
                              triggerLabel="✎ More fields"
                              triggerClassName="btn-more-fields"
                              onSubmit={(form) => patchItem(event.id, form)}
                              onDelete={() => deleteItem(event.id)}
                            />
                          )}
                        </div>
                        {index < kindItems.length - 1 && (
                          <span className="timeline-arrow" aria-hidden="true">→</span>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </GridLayoutEditor>
            ) : (
              <GridLayoutEditor
                sectionKey={`timeline-${kind}`}
                defaultGap={16}
                defaultItemWidth={240}
                initial={layout?.[`timeline-${kind}`]}
                revalidateTarget="/timeline"
              >
                <div className="card-grid">
                  {kindItems.map((item, index) => {
                    const target = { type: 'item', collection: 'timeline', id: item.id };
                    return (
                      <div key={item.id} className={`card ${shapeClassName(item.shape, index)}`.trim()}>
                        <EditableText
                          as="h3"
                          value={item.title}
                          font={item.titleFont}
                          fieldKey="title"
                          target={target}
                          revalidateTarget="/timeline"
                          placeholder="Title"
                        />
                        <EditableText
                          as="p"
                          value={item.organization}
                          font={item.organizationFont}
                          fieldKey="organization"
                          target={target}
                          revalidateTarget="/timeline"
                          placeholder="Add an organization…"
                        />
                        <p className="card-date">
                          <DateRange event={item} target={target} isOwner={isOwner} />
                        </p>
                        <EditableText
                          as="p"
                          value={item.description}
                          font={item.descriptionFont}
                          fieldKey="description"
                          multiline
                          target={target}
                          revalidateTarget="/timeline"
                          placeholder="Add a description…"
                        />
                        {item.siteUrl && (
                          <a href={item.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                            Visit site
                          </a>
                        )}
                        <AttachmentList attachments={item.attachments} />
                        {isOwner && (
                          <ItemEditPanel
                            fields={EXTRA_FIELDS}
                            initial={item}
                            collectionName="timeline"
                            itemId={item.id}
                            triggerLabel="✎ More fields"
                            triggerClassName="btn-more-fields"
                            onSubmit={(form) => patchItem(item.id, form)}
                            onDelete={() => deleteItem(item.id)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </GridLayoutEditor>
            )}
          </Section>
        );
      })}

      {isOwner && (
        <div className="about">
          <ItemEditPanel
            fields={CREATE_FIELDS}
            initial={{}}
            collectionName="timeline"
            triggerLabel="+ Add timeline entry"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}
    </>
  );
}
