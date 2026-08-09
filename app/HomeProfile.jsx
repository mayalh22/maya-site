'use client';

import { useState } from 'react';
import EditableImage from '@/components/editing/EditableImage';
import EditableText from '@/components/editing/EditableText';
import ImageUrlField from '@/components/admin/ImageUrlField';
import { useAdminUser } from '@/lib/auth';
import { getSingleton, setSingleton } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';

const CONTENT_PATH = 'siteContent/home';

function asPhoto(entry) {
  return typeof entry === 'string' ? { url: entry } : entry;
}

export default function HomeProfile({ home }) {
  const { isOwner } = useAdminUser();
  const [newUrl, setNewUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const photos = (home?.photoUrls || []).map(asPhoto);
  const name = home?.name;
  const hasContent = !!home || isOwner;

  async function addPhoto() {
    const url = newUrl.trim();
    if (!url) return;
    setBusy(true);
    try {
      const current = (await getSingleton(CONTENT_PATH, {})) || {};
      const currentPhotos = (current.photoUrls || []).map(asPhoto);
      await setSingleton(CONTENT_PATH, {
        ...current,
        photoUrls: [...currentPhotos, { url, zoomX: 1, zoomY: 1, posX: 50, posY: 50, sizeW: 1, sizeH: 1 }],
      });
      await revalidatePublicPath('/');
      setNewUrl('');
    } finally {
      setBusy(false);
    }
  }

  if (!hasContent) {
    return <p className="empty-state">No profile info yet.</p>;
  }

  return (
    <>
      {photos.length > 1 ? (
        <div className="profile-carousel">
          <div className="profile-carousel-track">
            {[...photos, ...photos].map((photo, index) => (
              <EditableImage
                key={index}
                src={photo.url}
                alt={name || ''}
                className="profile-carousel-frame"
                priority={index < photos.length}
                sizes="160px"
                zoomX={photo.zoomX ?? photo.zoom}
                zoomY={photo.zoomY ?? photo.zoom}
                posX={photo.posX}
                posY={photo.posY}
                sizeW={photo.sizeW}
                sizeH={photo.sizeH}
                cropKeyPrefix=""
                target={{ type: 'homePhoto', path: CONTENT_PATH, index: index % photos.length }}
                revalidateTarget="/"
                allowRemove
              />
            ))}
          </div>
        </div>
      ) : (
        photos[0] && (
          <div className="profile-frame">
            <EditableImage
              src={photos[0].url}
              alt={name || ''}
              className="profile"
              priority
              sizes="200px"
              zoomX={photos[0].zoomX ?? photos[0].zoom}
              zoomY={photos[0].zoomY ?? photos[0].zoom}
              posX={photos[0].posX}
              posY={photos[0].posY}
              sizeW={photos[0].sizeW}
              sizeH={photos[0].sizeH}
              cropKeyPrefix=""
              target={{ type: 'homePhoto', path: CONTENT_PATH, index: 0 }}
              revalidateTarget="/"
              allowRemove
            />
          </div>
        )
      )}

      {isOwner && (
        <div className="admin-field home-add-photo">
          <ImageUrlField id="newHomePhoto" value={newUrl} onChange={setNewUrl} />
          <button type="button" className="btn btn-small btn-secondary" onClick={addPhoto} disabled={busy}>
            {busy ? 'Adding…' : '+ Add photo'}
          </button>
        </div>
      )}

      {name || isOwner ? (
        <EditableText
          as="h1"
          value={name}
          align={home?.nameAlign}
          fieldKey="name"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/"
          placeholder="Add your name…"
        />
      ) : (
        <h1>Welcome</h1>
      )}
      <EditableText
        as="h3"
        value={home?.tagline}
        align={home?.taglineAlign}
        fieldKey="tagline"
        target={{ type: 'singleton', path: CONTENT_PATH }}
        revalidateTarget="/"
        placeholder="Add a tagline…"
      />
      <EditableText
        as="p"
        value={home?.bio}
        align={home?.bioAlign}
        fieldKey="bio"
        multiline
        target={{ type: 'singleton', path: CONTENT_PATH }}
        revalidateTarget="/"
        placeholder="Add a bio…"
      />
    </>
  );
}
