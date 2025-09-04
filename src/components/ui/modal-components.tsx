import Link from 'next/link';
import React, { useEffect, useState } from 'react';



// YouTube Modal
type YouTubeModalProps = {
  content?: string;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
};

export const YouTubeModal: React.FC<YouTubeModalProps> = ({
  content,
  isLoading,
  hasError,
  onLoad,
  onError,
}) => {
  const extractYoutubeId = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      // Handle Google Drive preview links
      if (parsedUrl.hostname.includes("drive.google.com")) {
        const match = url.match(/\/d\/([^/]+)\//);
        return match ? { type: "drive", id: match[1] } : null;
      }

      // Shorts: youtube.com/shorts/<id>
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return { type: "youtube", id: parsedUrl.pathname.split("/shorts/")[1].split("?")[0] };
      }

      // Watch: youtube.com/watch?v=<id>
      if (parsedUrl.searchParams.get("v")) {
        return { type: "youtube", id: parsedUrl.searchParams.get("v")! };
      }

      // youtu.be/<id>
      if (parsedUrl.hostname === "youtu.be") {
        return { type: "youtube", id: parsedUrl.pathname.slice(1) };
      }

      // Embed / other formats
      const regExp = /^.*(?:embed\/|v\/|watch\/|\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[1].length === 11 ? { type: "youtube", id: match[1] } : null;
    } catch {
      return null;
    }
  };

  const videoData = content ? extractYoutubeId(content) : null;

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
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {videoData && !hasError && (
        <div className={`media-wrapper ${isLoading ? "loading" : ""}`}>
          {videoData.type === "youtube" ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={onLoad}
              onError={onError}
              className="youtube-iframe"
            />
          ) : (
            <iframe
              src={`https://drive.google.com/file/d/${videoData.id}/preview`}
              title="Google Drive video player"
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
              onLoad={onLoad}
              onError={onError}
              className="drive-iframe"
            />
          )}
        </div>
      )}

      {!videoData && !hasError && (
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
        <div className={`media-wrapper ${isLoading ? 'loading' : 'img'}`}>
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
            <Link href={content} target="_blank" rel="noopener noreferrer">
              Read original article
            </Link>
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

