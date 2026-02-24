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

      <Section title="Social & Contact" subtitle="Ways to reach me">
          <div className="contact-grid">
            {/* Render contact cards here. To change card height, edit rowHeight prop. */}
            {/* Example: <Card title="Email" fixOverflow /> */}
            {/* Use different connect text for each card. */}
            <Grid columns={3} rows={2} rowHeight="180px">
              {contactData.social.map((link, index) => {
            const baseColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];
            // special colors for Email and Spotify
            let bg = baseColors[index % baseColors.length];
            if ((/email/i).test(link.platform)) bg = 'var(--light-yellow)';
            if ((/spotify/i).test(link.platform)) bg = 'var(--pink)';

            const platformClass = link.platform.toLowerCase().replace(/\s+/g, '-');

            return (
              <div key={index} className={`card contact-card ${platformClass}`} style={{ backgroundColor: bg }}>
                <h3 style={{ marginTop: 0 }}>{link.platform}</h3>
                <p style={{ margin: '0.25rem 0' }}><strong>{link.username}</strong></p>
                <p style={{ margin: '0.25rem 0' }}>{link.description}</p>
                <a
                  href={link.url}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                        {`Connect via ${link.platform}`}
                </a>
              </div>
            );
          })}
            </Grid>
        </div>
      </Section>

      <div className="about">
        <p>{contactData.closingMessage}</p>
      </div>
    </main>
  );
}
