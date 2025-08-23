import React from 'react';
import SocialLink from '../components/SocialLink';

type SocialPlatform = {
  name: string;
  icon: "twitter" | "medium" | "dribbble" | "behance" | "github" | "linkedin" | "mail";
  href: string;
  color: string;
};

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'GitHub',
    icon: 'github',
    href: 'https://github.com/yourusername',
    color: 'var(--color-primary)',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://linkedin.com/in/yourprofile',
    color: 'var(--color-secondary)',
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    href: 'https://twitter.com/yourhandle',
    color: 'var(--color-accent)',
  },
  {
    name: 'Medium',
    icon: 'medium',
    href: 'https://medium.com/@yourhandle',
    color: 'var(--color-text)',
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
            <div className="social-icon-wrapper" style={{ color: platform.color }}>
              <SocialLink 
                href={platform.href} 
                icon={platform.icon}
                color={platform.color}
              />
              <div className="social-glow"></div>
            </div>
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-name-link"
            >
              <span className="social-name">{platform.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}