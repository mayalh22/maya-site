'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import AttachmentList from '@/components/AttachmentList';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { useDragReorder, reorderSubset } from '@/lib/useDragReorder';
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

function formatMonth(value) {
  if (!value) return value;
  const [year, month] = value.split('-');
  if (!year || !month) return value;
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
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
        placeholder="Start date"
        formatDisplay={formatMonth}
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
          placeholder="Present"
          formatDisplay={formatMonth}
        />
      ) : (
        <span>{event.endDate ? formatMonth(event.endDate) : 'Present'}</span>
      )}
    </>
  );
}

function TimelineKindSection({ kind, kindItems, list, reorder, layout, isOwner, patchItem, deleteItem }) {
  const [rearranging, setRearranging] = useState(false);
  const { dragHandlers, dragIndex } = useDragReorder(kindItems, (nextKindItems) => {
    reorder(reorderSubset(list, (entry) => entry.kind === kind, nextKindItems));
  });

  return (
    <>
      {isOwner && kindItems.length > 1 && (
        <div className="rearrange-row">
          <button type="button" className="layout-editor-toggle" onClick={() => setRearranging((v) => !v)}>
            {rearranging ? 'Done rearranging' : 'Rearrange'}
          </button>
        </div>
      )}
      <GridLayoutEditor
        sectionKey={`timeline-${kind}`}
        defaultGap={16}
        defaultItemsPerRow={4}
        defaultWidth={240}
        initial={layout?.[`timeline-${kind}`]}
        revalidateTarget="/timeline"
      >
        <div className="card-grid">
          {kindItems.map((item, index) => {
            const target = { type: 'item', collection: 'timeline', id: item.id };
            return (
              <div
                key={item.id}
                className={`card ${shapeClassName(item.shape, index)} ${dragIndex === index ? 'dragging' : ''}`.trim()}
                {...(rearranging ? dragHandlers(index) : {})}
              >
                {kind === 'experience' ? (
                  <>
                    <p className="timeline-date">
                      <DateRange event={item} target={target} isOwner={isOwner} />
                    </p>
                    <h3>
                      <EditableText
                        as="span"
                        value={item.title}
                        align={item.titleAlign}
                        fieldKey="title"
                        target={target}
                        revalidateTarget="/timeline"
                        placeholder="Title"
                      />
                      {(item.organization || isOwner) && <span> at </span>}
                      <EditableText
                        as="span"
                        value={item.organization}
                        align={item.organizationAlign}
                        fieldKey="organization"
                        target={target}
                        revalidateTarget="/timeline"
                        placeholder="Organization"
                      />
                    </h3>
                    {item.location && <p><em>{item.location}</em></p>}
                    <EditableText
                      as="p"
                      value={item.description}
                      align={item.descriptionAlign}
                      fieldKey="description"
                      multiline
                      target={target}
                      revalidateTarget="/timeline"
                      placeholder="Add a description…"
                    />
                  </>
                ) : (
                  <>
                    <EditableText
                      as="h3"
                      value={item.title}
                      align={item.titleAlign}
                      fieldKey="title"
                      target={target}
                      revalidateTarget="/timeline"
                      placeholder="Title"
                    />
                    <EditableText
                      as="p"
                      value={item.organization}
                      align={item.organizationAlign}
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
                      align={item.descriptionAlign}
                      fieldKey="description"
                      multiline
                      target={target}
                      revalidateTarget="/timeline"
                      placeholder="Add a description…"
                    />
                  </>
                )}
                <div className="timeline-actions">
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
              </div>
            );
          })}
        </div>
      </GridLayoutEditor>
    </>
  );
}

export default function TimelineSections({ entries: initialEntries, layout }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem, reorder, clearAll, busy } = useOwnerCollection('timeline', {
    initialItems: initialEntries,
    reorderable: true,
    revalidateTarget: '/timeline',
  });
  const list = items || [];

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
        const kindItems = list.filter((entry) => entry.kind === kind);
        if (kindItems.length === 0 && !isOwner) return null;

        return (
          <Section key={kind} title={title}>
            {kindItems.length === 0 ? (
              <p className="empty-state">No entries yet.</p>
            ) : (
              <TimelineKindSection
                kind={kind}
                kindItems={kindItems}
                list={list}
                reorder={reorder}
                layout={layout}
                isOwner={isOwner}
                patchItem={patchItem}
                deleteItem={deleteItem}
              />
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
