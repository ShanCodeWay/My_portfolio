'use client';

import React from 'react';
import ThemeIcon from './ThemeIcon';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  size?: number;
}

export default function ThemeToggle({ theme, toggleTheme, size = 24 }: ThemeToggleProps) {
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors"
      style={{ 
        color: 'var(--color-foreground)',
        backgroundColor: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      aria-label="Toggle dark mode"
    >
      <ThemeIcon theme={theme} size={size} />
    </button>
  );
}