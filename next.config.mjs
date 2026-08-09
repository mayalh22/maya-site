/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Image URLs are owner-supplied free text (ImageUrlField / Firebase
    // Storage uploads), not limited to one host, so this stays wildcard
    // rather than an allowlist of specific domains.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
