export const metadata = {
  title: 'Contact - Maya Hazarika',
  description: 'Maya Hazarika\'s social links and email.',
};

import contactData from '@/lib/content/contact.json';
import Section from '@/components/Section';

export default function ContactPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Contact</h1>
        <p>{contactData.message}</p>
      </div>

      <Section title="Social & Contact" subtitle="Ways to reach me" colorVar="var(--orange)">
        <div className="card-grid">
          {contactData.social.map((link, index) => {
            const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];
            return (
              <div key={index} className="card" style={{ backgroundColor: cardColors[index % cardColors.length], borderRadius: '8px' }}>
                <h3>{link.platform}</h3>
                <p><strong>{link.username}</strong></p>
                <p>{link.description}</p>
                <a
                  href={link.url}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect
                </a>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="about">
        <p>{contactData.closingMessage}</p>
      </div>
    </main>
  );
}
