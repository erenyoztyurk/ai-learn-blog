import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(var(--bg-rgb), 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
        zIndex: 100
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/" style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🤖
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.3px'
            }}>
              AI Learn Blog
            </span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 160px)' }}>
        {children}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-light)',
        fontSize: '0.875rem'
      }}>
        © 2026 AI Learn Blog
      </footer>
    </>
  );
}