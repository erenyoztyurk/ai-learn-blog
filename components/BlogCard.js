import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="card">
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
          {post.title}
        </h3>
        <p style={{ color: 'var(--text-light)', marginBottom: '1rem', lineHeight: 1.6 }}>
          {post.excerpt.substring(0, 120)}...
        </p>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
          <span>📅 {post.date}</span>
          <span>⏱️ {post.readingTime}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {post.tags?.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem',
              color: '#3b82f6',
              background: 'rgba(59,130,246,0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}