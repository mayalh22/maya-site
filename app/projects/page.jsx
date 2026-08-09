import Section from '@/components/Section';
import { getSingleton, listOrdered } from '@/lib/db';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';
import ProjectsGrid from './ProjectsGrid';

export const metadata = {
  title: 'Projects',
  description: 'Code and design projects.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/projects';

export default async function ProjectsPage() {
  const [projects, content, layout] = await Promise.all([
    listOrdered('projects'),
    getSingleton(CONTENT_PATH, null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Projects</h1>
        <EditableText
          value={content?.message}
          align={content?.messageAlign}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/projects"
          placeholder="Add an intro message…"
        />
      </div>

      <Section title="Projects">
        <GridLayoutEditor
          sectionKey="projects"
          defaultGap={16}
          defaultItemWidth={300}
          initial={layout?.projects}
          revalidateTarget="/projects"
        >
          <ProjectsGrid projects={projects} />
        </GridLayoutEditor>
      </Section>

      <OptionalSection className="about" value={content?.closingMessage}>
        <EditableText
          value={content?.closingMessage}
          align={content?.closingMessageAlign}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/projects"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
