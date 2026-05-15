import { useState } from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import SearchBar from '../components/SearchBar';

export default function Home({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <section style={{
        textAlign: 'center',
        padding: '5rem 0 4rem',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(139,92,246,0.03) 100%)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 1.5rem'
          }}>
            🤖
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em'
          }}>
            AI Learn Blog
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '560px', margin: '0 auto' }}>
            Exploring the frontiers of <span style={{ color: '#3b82f6', fontWeight: 500 }}>Artificial Intelligence</span> and modern technology
          </p>
          
          <div style={{ maxWidth: '480px', margin: '2.5rem auto 0' }}>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {searchQuery && (
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            🔍 {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="blog-card">
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  {post.tags?.slice(0, 2).map(tag => (
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
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: 1.4
                }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {post.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>{post.date}</span>
                  <span>⏱️ {post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && searchQuery && (
          <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No articles found matching "{searchQuery}"
          </p>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts }
  };
}