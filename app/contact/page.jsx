import contactData from '@/lib/content/contact.json';
import Section from '@/components/Section';
import { getCardColor } from '@/lib/utils';

export const metadata = {
  title: 'Contact',
  description: 'My social links and email.',
};

export default function ContactPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Contact</h1>
        <p>{contactData.message}</p>
      </div>

      <Section title="Social & Contact" subtitle="Ways to reach me">
        <div className="contact-grid">
          {contactData.social.map((link, index) => (
            <div
              key={index}
              className="card"
              style={{ backgroundColor: getCardColor(index) }}
            >
              <h3>{link.platform}</h3>
              <p>{link.username}</p>
              <p>{link.description}</p>
              <a href={link.url} className="btn" target="_blank" rel="noopener noreferrer">
                My {link.platform}
              </a>
            </div>
          ))}
        </div>
      </Section>

      <div className="about">
        <p>{contactData.closingMessage}</p>
      </div>
    </main>
  );
}