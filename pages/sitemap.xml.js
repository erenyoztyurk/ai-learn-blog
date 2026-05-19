import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://ai-learn-blog.vercel.app';

function generateSiteMap(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     ${slugs
       .map((slug) => {
         return `
       <url>
           <loc>${`${BASE_URL}/blog/${slug}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps işi bitireceği için burası boş kalabilir
}

export async function getServerSideProps({ res }) {
  // content/blog klasörünün yolunu buluyoruz
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  let slugs = [];

  if (fs.existsSync(blogDirectory)) {
    // Klasör içindeki alt makale klasörlerini listeliyoruz
    slugs = fs.readdirSync(blogDirectory).filter((file) => {
      return fs.statSync(path.join(blogDirectory, file)).isDirectory();
    });
  }

  // XML içeriğini oluşturuyoruz
  const sitemap = generateSiteMap(slugs);

  res.setHeader('Content-Type', 'text/xml');
  // Tarayıcıya veya Google'a XML çıktısını basıyoruz
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;