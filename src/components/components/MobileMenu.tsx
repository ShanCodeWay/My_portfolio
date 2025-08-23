'use client';

import React, { useEffect } from 'react';
import ThemeIcon from './ThemeIcon';
import './_mobileMenuStyles.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function MobileMenu({ isOpen, onClose, theme, toggleTheme }: MobileMenuProps) {
  const navItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`mobile-menu-container ${isOpen ? 'open' : ''}`}>
      <div className="menu-backdrop" onClick={onClose}></div>
      
      <div className="menu-content">
        <button 
          className="menu-close-btn"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <nav className="mobile-nav-items">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={onClose}
            >
              <span className="underline-animation">{item.label}</span>
            </a>
          ))}
        </nav>
        
        <button 
          className="mobile-theme-toggle"
          onClick={() => {
            toggleTheme();
            onClose();
          }}
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-content">
            <span className="underline-animation">Toggle Theme</span>
          </div>
          <ThemeIcon theme={theme} className="theme-icon" size={20} />
        </button>
      </div>
    </div>
  );
}