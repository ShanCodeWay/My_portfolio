import React, { useEffect, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, youtubeId, title }: VideoModalProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset states when modal opens
      setHasError(false);
      setIsLoading(true);
      
      // Add event listener for beforeunload
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = 'You have a video playing. Are you sure you want to leave?';
        return 'You have a video playing. Are you sure you want to leave?';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={handleClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={handleClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="video-modal-header">
          <h3 className="video-modal-title">{title || 'Project Demo'}</h3>
        </div>

        <div className="video-player-container">
          {isLoading && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading video...</p>
            </div>
          )}

          {hasError && (
            <div className="video-error">
              <div className="error-icon">⚠️</div>
              <h4>Demo Video Not Available</h4>
              <p>Sorry, the demo video cannot be loaded at this time.</p>
              <button className="retry-button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {youtubeId && !hasError && (
            <div className={`video-wrapper ${isLoading ? 'loading' : ''}`}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                className="youtube-iframe"
              />
            </div>
          )}

          {!youtubeId && (
            <div className="no-video-message">
              <div className="no-video-icon">🎬</div>
              <h4>No Demo Video Available</h4>
              <p>This project doesn't have a demo video yet.</p>
            </div>
          )}
        </div>

        <div className="video-modal-footer">
          <p className="video-warning">⚠️ Video will pause if you navigate away</p>
        </div>
      </div>
    </div>
  );
}