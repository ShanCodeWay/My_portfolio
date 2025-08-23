// QRCodeResume.tsx
'use client';

import React from 'react';
import { useTheme } from '@/components/contexts/ThemeContext';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeResumeProps {
  url: string;
  size?: number;
  className?: string;
  position?: 'static' | 'absolute' | 'fixed';
  showLabel?: boolean;
}

const QRCodeResume: React.FC<QRCodeResumeProps> = ({ 
  url, 
  size = 80, 
  className = '',
  position = 'static',
  showLabel = true
}) => {
  const { theme } = useTheme();

  const positionClass = position === 'fixed' ? 'fixed' : position === 'absolute' ? 'absolute' : 'static';

  return (
    <div className={`${positionClass} ${className}`} style={position !== 'static' ? { top: '10rem', right: '4rem' } : {}}>
      <div className="p-2 rounded-lg bg-[var(--hero-card-bg)] border border-[var(--hero-social-border)] shadow-lg">
        <QRCodeCanvas
          value={url}
          size={size}
          bgColor={theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          fgColor={theme === 'dark' ? '#ffffff' : '#000000'}
          level="H"
          includeMargin={false}
          style={{
            borderRadius: '6px',
          }}
        />
        {showLabel && (
          <div className="text-xs text-center mt-1 text-[var(--hero-text)]/70">
            Scan resume
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeResume;