import React from 'react';

export default function ScrollIndicator() {
  return (
    <div className="mt-16 animate-bounce">
      <a
        href="#projects"
        className="flex flex-col items-center transition-colors"
        style={{ color: "var(--hero-text)", opacity: 0.7 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hero-accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hero-text)")}
      >
        <span className="mb-2">Scroll Down</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </a>
    </div>
  );
}
