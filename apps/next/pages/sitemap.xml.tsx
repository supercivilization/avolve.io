import type { GetServerSideProps } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://avolve.io'

function generateSiteMap() {
  const staticPages = [
    '',
    '/pricing',
    '/sign-in',
    '/sign-up',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${staticPages
       .map((path) => {
         return `
       <url>
           <loc>${SITE_URL}${path}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${path === '' ? 'daily' : 'weekly'}</changefreq>
           <priority>${path === '' ? '1.0' : '0.8'}</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will handle the response
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
