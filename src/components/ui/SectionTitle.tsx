// components/ui/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-title-container text-center">
      <h2 className="section-title text-3xl font-bold">{title}</h2>
      {subtitle && (
        <p className="section-subtitle mt-2 text-lg text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
