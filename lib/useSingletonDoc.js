'use client';

import { useEffect, useState } from 'react';
import { getSingleton, setSingleton } from './db';
import { revalidatePublicPath } from './revalidate';

export function useSingletonDoc(path, defaults, revalidateTarget, revalidateOptions) {
  const [data, setData] = useState(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getSingleton(path, defaults).then((result) => {
      if (!cancelled) {
        setData({ ...defaults, ...result });
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  function setField(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      await setSingleton(path, data);
      await revalidatePublicPath(revalidateTarget, revalidateOptions);
      setStatus({ type: 'success', message: 'Saved.' });
    } catch {
      setStatus({ type: 'error', message: 'Could not save. Try again.' });
    } finally {
      setSaving(false);
    }
  }

  return { data, setField, save, loading, saving, status };
}
