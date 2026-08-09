import Section from '@/components/Section';
import { getSingleton, listOrdered } from '@/lib/db';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';
import ContactEmail from './ContactEmail';
import SocialGrid from './SocialGrid';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/contact';

export default async function ContactPage() {
  const [contact, social, layout] = await Promise.all([
    getSingleton(CONTENT_PATH, null),
    listOrdered('social'),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Contact</h1>
        <EditableText
          value={contact?.message}
          align={contact?.messageAlign}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/contact"
          placeholder="Add an intro message…"
        />
        <ContactEmail email={contact?.email} />
      </div>

      <Section title="Social">
        <GridLayoutEditor
          sectionKey="social"
          defaultGap={16}
          defaultItemWidth={240}
          initial={layout?.social}
          revalidateTarget="/contact"
        >
          <SocialGrid social={social} />
        </GridLayoutEditor>
      </Section>

      <OptionalSection className="about" value={contact?.closingMessage}>
        <EditableText
          value={contact?.closingMessage}
          align={contact?.closingMessageAlign}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/contact"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
