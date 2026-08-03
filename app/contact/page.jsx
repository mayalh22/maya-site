import Section from '@/components/Section';
import AttachmentList from '@/components/AttachmentList';
import { getSingleton, listOrdered } from '@/lib/db';
import { shapeClassName } from '@/lib/shape';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export const revalidate = 300;

export default async function ContactPage() {
  const [contact, social, layout] = await Promise.all([
    getSingleton('siteContent/contact', null),
    listOrdered('social'),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Contact</h1>
        {contact?.message && <p>{contact.message}</p>}
        {contact?.email && (
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        )}
      </div>

      <Section title="Social">
        {social.length === 0 ? (
          <p className="empty-state">No social links yet.</p>
        ) : (
          <GridLayoutEditor
            sectionKey="social"
            defaultGap={16}
            defaultItemWidth={240}
            initial={layout?.social}
            revalidateTarget="/contact"
          >
            <div className="contact-grid">
              {social.map((link, index) => (
                <div key={link.id} className={`card ${shapeClassName(link.shape, index)}`.trim()}>
                  <h3>{link.platform}</h3>
                  {link.username && <p>{link.username}</p>}
                  {link.description && <p>{link.description}</p>}
                  <a href={link.url} className="btn" target="_blank" rel="noopener noreferrer">
                    {link.platform}
                  </a>
                  <AttachmentList attachments={link.attachments} />
                </div>
              ))}
            </div>
          </GridLayoutEditor>
        )}
      </Section>

      {contact?.closingMessage && (
        <div className="about">
          <p>{contact.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
