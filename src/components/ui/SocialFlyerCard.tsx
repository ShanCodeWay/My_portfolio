import React, { useState, useEffect } from 'react';

interface FlyerProps {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  ctaText?: string;
  ctaLink?: string;
  author?: string;
  date?: string;
}

const SocialFlyer: React.FC<FlyerProps> = ({
  title,
  description,
  imageUrl,
  tags = [],
  ctaText = "View More",
  ctaLink = "#",
  author = "Unknown",
  date = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll animation class after component mounts
    setIsVisible(true);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <>
      <div className={`social-flyer ${isVisible ? 'scroll-animate' : ''}`}>
        <div className="flyer-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div className="flyer-image-placeholder">Image Placeholder</div>
          )}
          
          <div className="flyer-overlay">
            <div className="flyer-overlay-content">
              <h3 className="flyer-title-overlay">{title}</h3>
              <div className="flyer-links-overlay">
                <a 
                  href={ctaLink} 
                  className="flyer-link-overlay flyer-demo-link"
                  onClick={handleCtaClick}
                >
                  {ctaText}
                </a>
                <button 
                  className="flyer-link-overlay flyer-code-link"
                  onClick={handleShareClick}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flyer-content">
          <h3 className="flyer-title">{title}</h3>
          <p className="flyer-description">{description}</p>
          
          {tags.length > 0 && (
            <div className="flyer-tags">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="flyer-tag"
                  style={{ '--tag-index': idx } as React.CSSProperties}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flyer-actions">
            <a 
              href={ctaLink} 
              className="flyer-action-btn flyer-primary-action"
              onClick={handleCtaClick}
            >
              {ctaText}
            </a>
            <button 
              className="flyer-action-btn flyer-secondary-action"
              onClick={handleShareClick}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="flyer-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="flyer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flyer-modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className="flyer-modal-content">
              <img src={imageUrl} alt={title} />
              <div className="flyer-modal-details">
                <h2>{title}</h2>
                <p>{description}</p>
                <a href={ctaLink} className="flyer-modal-cta primary-cta">
                  {ctaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

  
    </>
  );
};

export default SocialFlyer;