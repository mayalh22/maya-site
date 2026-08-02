'use client';

import GalleryEditor from '@/components/admin/GalleryEditor';
import artFallback from '@/lib/content/art.json';
import { resolveAssetSrc } from '@/lib/images';

export default function ArtGalleryAdmin() {
  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Art gallery</h2></div>
      <div className="section-body">
        <GalleryEditor
          docPath="content/art"
          arrayField="pieces"
          storageFolder="art"
          fallback={artFallback}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', textarea: true },
            { key: 'date', label: 'Date' },
          ]}
          resolveSrc={(item) => resolveAssetSrc(item.image)}
        />
      </div>
    </div>
  );
}
