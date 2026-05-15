import { useRouter } from 'next/router';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogPost({ post, mdxSource }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>404 - Article Not Found</h2>
        <a href="/" style={{ color: '#3b82f6' }}>← Back to Home</a>
      </div>
    );
  }

  return (
    <article className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {post.tags?.map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem',
              color: '#3b82f6',
              background: 'rgba(59,130,246,0.1)',
              padding: '0.2rem 0.6rem',
              borderRadius: '20px'
            }}>
              {tag}
            </span>
          ))}
        </div>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          {post.title}
        </h1>
        <div style={{
          display: 'flex',
          gap: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.875rem'
        }}>
          <span>{post.date}</span>
          <span>⏱️ {post.readingTime}</span>
        </div>
      </header>

      <div className="blog-content">
        <MDXRemote {...mdxSource} />
      </div>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return { notFound: true };
  }
  
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });
  
  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime: post.readingTime,
      },
      mdxSource,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug },
  }));
  
  return {
    paths,
    fallback: true,
  };
}