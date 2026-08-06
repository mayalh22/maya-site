import Enlarge from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';

export const metadata = {
  title: 'Photos',
  description: 'A photo gallery.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/photos';

export default async function PhotosPage() {
  const [photos, content, layout] = await Promise.all([
    listOrdered('photos'),
    getSingleton(CONTENT_PATH, null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        <EditableText
          value={content?.message}
          font={content?.messageFont}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/photos"
          placeholder="Add an intro message…"
        />
      </div>

      <Enlarge photos={photos} layout={layout} />

      <OptionalSection className="about" value={content?.closingMessage}>
        <EditableText
          value={content?.closingMessage}
          font={content?.closingMessageFont}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/photos"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
