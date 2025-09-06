import createMDX from '@next/mdx'
/** @type {import('next').NextConfig} */

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // 👇 desativa a injeção do @mdx-js/react (evita a exigência de "use client")
  options: { providerImportSource: undefined }
})

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self' data:",
      "connect-src 'self' https: http:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" }
]

const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { serverActions: { allowedOrigins: ['*'] } },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders
      }
    ]
  }
}

export default withMDX(config)
