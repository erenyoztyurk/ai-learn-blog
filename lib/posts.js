import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const folders = fs.readdirSync(postsDirectory);
  
  const posts = folders
    .filter(folder => {
      const folderPath = path.join(postsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map(folder => {
      const mdxPath = path.join(postsDirectory, folder, 'index.mdx');
      if (!fs.existsSync(mdxPath)) return null;
      
      const fileContents = fs.readFileSync(mdxPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: folder,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        readingTime: data.readingTime || '3 min'
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return posts;
}

export function getPostBySlug(slug) {
  const mdxPath = path.join(postsDirectory, slug, 'index.mdx');
  if (!fs.existsSync(mdxPath)) return null;
  
  const fileContents = fs.readFileSync(mdxPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    readingTime: data.readingTime || '3 min',
    content
  };
}