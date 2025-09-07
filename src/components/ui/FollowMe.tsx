import React from 'react';
import SocialLink from '../components/SocialLink';

type SocialPlatform = {
  name: string;
  icon: "x" | "medium" | "dribbble" | "behance" | "github" | "linkedin" | "mail" | "youtube";
  href: string;
  color: string;
};

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'GitHub',
    icon: 'github',
    href: 'https://github.com/ShanCodeWay',
    color: 'var(--color-primary)',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/darshana-wijebahu/',
    color: 'var(--color-secondary)',
  },
  {
    name: 'X',
    icon: 'x',
    href: 'https://twitter.com/DWijebahu',
    color: 'var(--color-text)',
  },
  {
    name: 'Medium',
    icon: 'medium',
    href: 'https://medium.com/@wijebahuwmpwdgb.20',
    color: 'var(--color-text)',
  },
  {
    name: 'YouTube',
    icon: 'youtube',
    href: 'https://youtube.com/@darshanagayashanwijebahu8189?si=aGJYS-PKq5MI6S45',
    color: 'red',
  }
];

export default function FollowMe() {
  return (
    <div className="follow-me-horizontal">
      <div className="social-links-container">
        {socialPlatforms.map((platform, index) => (
          <div
            key={platform.name}
            className="social-link-item"
            style={{
              animationDelay: `${index * 100}ms`,
              color: platform.color
            }}
          >
            <div
              className="social-icon-wrapper"
              style={{
                color: platform.color,
                pointerEvents: 'none' 
              }}
            >
              <div style={{ pointerEvents: 'auto' }}>
                <SocialLink
                  href={platform.href}
                  icon={platform.icon}
                  color={platform.color}
                />
              </div>
              <div className="social-glow"></div>
            </div>
            <span className="social-name">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

