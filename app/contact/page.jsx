export const metadata = {
  title: 'Contact - Maya Hazarika',
  description: 'Maya Hazarika\'s social links and email.', };


  import Header from '@/components/Header';
import contactData from '@/lib/content/contact.json';

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="container">
        {/* Contact message */}
        <div className="about">
          <h1>Contact</h1>
          <p>{contactData.message}</p>
        </div>

        {/* Social cards */}
        <div className="card-grid">
          {contactData.social.map((link, index) => (
            <div key={index} className="card">
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
          ))}
        </div>

        {/* Closing message */}
        <div className="about">
          <p>{contactData.closingMessage}</p>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Maya Hazarika</p>
      </footer>
    </>
  );
}
