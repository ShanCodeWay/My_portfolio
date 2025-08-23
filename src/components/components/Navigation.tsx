'use client';

import React from 'react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navigation({ theme, toggleTheme }: NavigationProps) {
  const navItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="px-4 py-2 rounded-lg transition-colors group relative"
      style={{ 
        color: 'var(--color-foreground)',
        backgroundColor: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-hover)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
}