import Section from '@/components/Section';
import { getSingleton, listCollection } from '@/lib/db';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export const revalidate = 300;

export default async function ContactPage() {
  const [contact, social] = await Promise.all([
    getSingleton('siteContent/contact', null),
    listCollection('social'),
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
          <div className="contact-grid">
            {social.map((link) => (
              <div key={link.id} className="card">
                <h3>{link.platform}</h3>
                {link.username && <p>{link.username}</p>}
                {link.description && <p>{link.description}</p>}
                <a href={link.url} className="btn" target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
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
