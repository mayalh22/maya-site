export default function AttachmentList({ attachments }) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="attachment-list">
      {attachments.map((att, index) =>
        att.contentType?.startsWith('image/') ? (
          <a
            key={`${att.url}-${index}`}
            href={att.url}
            target="_blank"
            rel="noopener noreferrer"
            className="attachment-chip attachment-chip-image"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={att.url} alt={att.name || ''} loading="lazy" />
          </a>
        ) : (
          <a key={`${att.url}-${index}`} href={att.url} target="_blank" rel="noopener noreferrer" className="attachment-chip">
            📎 {att.name || 'Attachment'}
          </a>
        )
      )}
    </div>
  );
}
