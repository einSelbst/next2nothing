/*
 * Security Header stuff
 * @see {@link https://scotthel.me/cspcheatsheet}
 * Thanks @ https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/next.config.js
 *
 * You might need to insert additional domains in script-src if you are using external services
 * @see {@link https://report-uri.com/home/generate}
 */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  script-src-elem 'self' data:;
  style-src 'self' *.googleapis.com 'unsafe-inline';
  img-src * blob: data:;
  font-src 'self' data: fonts.gstatic.com;
  frame-src 'self' *.youtube-nocookie.com;
  sandbox allow-same-origin allow-scripts;
  connect-src *;
  media-src 'none';
`
/* upgrade-insecure-requests */

const PermissionsPolicy = `
  accelerometer=(),
  autoplay=(self "https://www.youtube-nocookie.com"),
  camera=(),
  display-capture=(),
  document-domain=(self),
  encrypted-media=(),
  fullscreen=(self "https://www.youtube-nocookie.com"),
  geolocation=(),
  gyroscope=(),
  magnetometer=(),
  microphone=(),
  midi=(),
  payment=(),
  picture-in-picture=(),
  publickey-credentials-get=(),
  sync-xhr=(),
  usb=(),
  screen-wake-lock=(),
  xr-spatial-tracking=()
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/gu, ''),
  },
  {
    key: 'Permissions-Policy',
    value: PermissionsPolicy.replace(/\n/gu, ''),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: true,
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in the application
        headers: securityHeaders,
        // Because of i18n routing I have to use "/:path*" instead of "/(.*)"
        source: '/:path*',
      },
      {
        // CORS headers, @see {@link https://ieftimov.com/post/deep-dive-cors-history-how-it-works-best-practices/}
        headers: [
          // the next line is an anti-pattern with 'Access-Control-Allow-Origing: *'
          /* { key: "Access-Control-Allow-Credentials", value: "true" }, */
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],

        // api routes are not localized
        locale: false,
        // matching all localized API routes, but not routes like '/api/hello'
        source: '/api/:path*',
      },
    ]
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ['@next2nothing/gateway'],
}

module.exports = nextConfig
