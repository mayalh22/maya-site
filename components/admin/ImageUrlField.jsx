'use client';

import { useState } from 'react';

export default function ImageUrlField({ id, value, onChange }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="image-url-field">
      <input
        id={id}
        type="url"
        inputMode="url"
        placeholder="https://example.com/image.jpg"
        value={value}
        onChange={(e) => {
          setBroken(false);
          onChange(e.target.value);
        }}
      />
      {value && broken && (
        <p className="image-url-error">Couldn't load an image from that URL.</p>
      )}
      {value && !broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="image-url-preview"
          src={value}
          alt=""
          loading="lazy"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}
