'use client';

import GalleryEditor from '@/components/admin/GalleryEditor';
import projectsFallback from '@/lib/content/projects.json';
import { resolveAssetSrc } from '@/lib/images';

export default function ProjectsGalleryAdmin() {
  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Projects gallery</h2></div>
      <div className="section-body">
        <GalleryEditor
          docPath="content/projects"
          arrayField="items"
          storageFolder="projects"
          fallback={{ items: projectsFallback }}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', textarea: true },
            { key: 'repository', label: 'Repository URL' },
            { key: 'playable', label: 'Live/Playable URL' },
          ]}
          resolveSrc={(item) => resolveAssetSrc(item.images?.[0])}
          buildItem={(form, url) => ({ ...form, images: [url] })}
        />
      </div>
    </div>
  );
}
