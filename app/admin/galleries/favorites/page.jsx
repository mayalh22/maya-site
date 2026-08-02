'use client';

import GalleryEditor from '@/components/admin/GalleryEditor';
import favoritesFallback from '@/lib/content/favorites.json';
import { resolveAssetSrc } from '@/lib/images';

export default function FavoritesGalleryAdmin() {
  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Favorites gallery</h2></div>
      <div className="section-body">
        <GalleryEditor
          docPath="content/favorites"
          arrayField="top"
          storageFolder="favorites"
          fallback={favoritesFallback}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'type', label: 'Type (Movie, Show, Book, Album…)' },
            { key: 'subtitle', label: 'Subtitle' },
          ]}
          resolveSrc={(item) => resolveAssetSrc(item.image)}
        />
      </div>
    </div>
  );
}
