import React, { useEffect, useState } from 'react';

// YouTube Modal
type YouTubeModalProps = {
  content?: string;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

export const YouTubeModal: React.FC<YouTubeModalProps> = ({ content, isLoading, hasError, onLoad, onError }) => {
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const youtubeId = content ? extractYoutubeId(content) : null;

  return (
    <div className="modal-media-container">
      {isLoading && (
        <div className="modal-loading">
          <div className="loading-spinner"></div>
          <p>Loading video...</p>
        </div>
      )}

      {hasError && (
        <div className="modal-error">
          <div className="error-icon">⚠️</div>
          <h4>Video Not Available</h4>
          <p>Sorry, the video cannot be loaded at this time.</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {youtubeId && !hasError && (
        <div className={`media-wrapper ${isLoading ? 'loading' : ''}`}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={onLoad}
            onError={onError}
            className="youtube-iframe"
          />
        </div>
      )}

      {!youtubeId && (
        <div className="modal-no-content">
          <div className="no-content-icon">🎬</div>
          <h4>No Video Available</h4>
          <p>This project doesn't have a video yet.</p>
        </div>
      )}
    </div>
  );
};

// Image Modal
type ImageModalProps = {
  content?: string;
  altText?: string;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

export const ImageModal: React.FC<ImageModalProps> = ({ content, altText, isLoading, hasError, onLoad, onError }) => {
  return (
    <div className="modal-media-container">
      {isLoading && (
        <div className="modal-loading">
          <div className="loading-spinner"></div>
          <p>Loading image...</p>
        </div>
      )}

      {hasError && (
        <div className="modal-error">
          <div className="error-icon">⚠️</div>
          <h4>Image Not Available</h4>
          <p>Sorry, the image cannot be loaded at this time.</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {content && !hasError && (
        <div className={`media-wrapper ${isLoading ? 'loading' : ''}`}>
          <img
            src={content}
            alt={altText}
            onLoad={onLoad}
            onError={onError}
            className="modal-image"
          />
        </div>
      )}

      {!content && (
        <div className="modal-no-content">
          <div className="no-content-icon">🖼️</div>
          <h4>No Image Available</h4>
          <p>This project doesn't have an image yet.</p>
        </div>
      )}
    </div>
  );
};

// Figma Modal
type FigmaModalProps = {
  content?: string;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

export const FigmaModal: React.FC<FigmaModalProps> = ({ content, isLoading, hasError, onLoad, onError }) => {
  return (
    <div className="modal-media-container">
      {isLoading && (
        <div className="modal-loading">
          <div className="loading-spinner"></div>
          <p>Loading prototype...</p>
        </div>
      )}

      {hasError && (
        <div className="modal-error">
          <div className="error-icon">⚠️</div>
          <h4>Prototype Not Available</h4>
          <p>Sorry, the Figma prototype cannot be loaded at this time.</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {content && !hasError && (
        <div className={`media-wrapper ${isLoading ? 'loading' : ''}`}>
          <iframe
            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(content)}`}
            title="Figma prototype"
            frameBorder="0"
            allowFullScreen
            onLoad={onLoad}
            onError={onError}
            className="figma-iframe"
          />
        </div>
      )}

      {!content && (
        <div className="modal-no-content">
          <div className="no-content-icon">🎨</div>
          <h4>No Prototype Available</h4>
          <p>This project doesn't have a Figma prototype yet.</p>
        </div>
      )}
    </div>
  );
};

// Article Modal
type ArticleModalProps = {
  content?: string;
  isLoading: boolean;
  hasError: boolean;
  metadata?: any;
  onLoad: () => void;
  onError: () => void;
};

export const ArticleModal: React.FC<ArticleModalProps> = ({ content, isLoading, hasError, metadata, onLoad, onError }) => {
  const [articleContent, setArticleContent] = useState('');

  useEffect(() => {
    if (content && content.startsWith('http')) {
      // In a real implementation, you would fetch the article content
      // For demo purposes, we'll use a placeholder
      setArticleContent(`
        <h2>Introduction</h2>
        <p>This is a placeholder for the article content. In a real implementation, 
        you would fetch the content from the provided URL or use an embed service.</p>
        <p>For Medium articles, you might use the Medium API or oEmbed to display content.</p>
        <h2>Key Points</h2>
        <ul>
          <li>Modern design principles</li>
          <li>User experience considerations</li>
          <li>Technical implementation details</li>
        </ul>
      `);
      onLoad();
    }
  }, [content, onLoad]);

  return (
    <div className="modal-article-container">
      {isLoading && (
        <div className="modal-loading">
          <div className="loading-spinner"></div>
          <p>Loading article...</p>
        </div>
      )}

      {hasError && (
        <div className="modal-error">
          <div className="error-icon">⚠️</div>
          <h4>Article Not Available</h4>
          <p>Sorry, the article cannot be loaded at this time.</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {content && !hasError && (
        <div className="article-content">
          <div 
            className="article-html-content" 
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
          <div className="article-original-link">
            <a href={content} target="_blank" rel="noopener noreferrer">
              Read original article
            </a>
          </div>
        </div>
      )}

      {!content && (
        <div className="modal-no-content">
          <div className="no-content-icon">📝</div>
          <h4>No Article Available</h4>
          <p>This project doesn't have an article yet.</p>
        </div>
      )}
    </div>
  );
};

// PDF Modal
type PdfModalProps = {
  content?: string;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

export const PdfModal: React.FC<PdfModalProps> = ({ content, isLoading, hasError, onLoad, onError }) => {
  return (
    <div className="modal-media-container">
      {isLoading && (
        <div className="modal-loading">
          <div className="loading-spinner"></div>
          <p>Loading document...</p>
        </div>
      )}

      {hasError && (
        <div className="modal-error">
          <div className="error-icon">⚠️</div>
          <h4>Document Not Available</h4>
          <p>Sorry, the document cannot be loaded at this time.</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {content && !hasError && (
        <div className={`media-wrapper ${isLoading ? 'loading' : ''}`}>
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(content)}&embedded=true`}
            title="PDF document"
            frameBorder="0"
            onLoad={onLoad}
            onError={onError}
            className="pdf-iframe"
          />
        </div>
      )}

      {!content && (
        <div className="modal-no-content">
          <div className="no-content-icon">📄</div>
          <h4>No Document Available</h4>
          <p>This project doesn't have a document yet.</p>
        </div>
      )}
    </div>
  );
};

