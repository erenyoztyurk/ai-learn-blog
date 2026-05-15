import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-card)',
          borderRadius: '48px',
          border: `1px solid ${isFocused ? 'var(--primary)' : 'var(--border)'}`,
          transition: 'all 0.2s ease',
          boxShadow: isFocused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none'
        }}
      >
        {/* Search Icon */}
        <div
          style={{
            position: 'absolute',
            left: '18px',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            color: 'var(--text-muted)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            padding: '14px 50px 14px 48px',
            fontSize: '0.95rem',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontFamily: 'inherit',
            letterSpacing: '-0.2px'
          }}
          placeholder="Search articles..."
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: 'none',
              background: 'var(--border)',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--border)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}

        {/* Keyboard Shortcut Hint */}
        {!query && !isFocused && (
          <div
            style={{
              position: 'absolute',
              right: '14px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <kbd style={{
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 500,
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-muted)',
              fontFamily: 'monospace'
            }}>
              ⌘ K
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}