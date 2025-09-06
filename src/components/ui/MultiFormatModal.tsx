import React, { useEffect, useState } from 'react';
import {
  YouTubeModal,
  ImageModal,
  FigmaModal,
  ArticleModal,
  PdfModal
} from './modal-components';


export type ModalType = 'youtube' | 'image' | 'figma' | 'article' | 'pdf';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: string; 
  type: ModalType;
  metadata?: {
    alt?: string;
    author?: string;
    date?: string;
    readTime?: string;
    pageCount?: number;
  };
}

export default function MultiFormatModal({ isOpen, onClose, title, content, type, metadata }: ModalProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (isOpen) {
    setHasError(false);

    // For articles, skip loading state entirely
    if (type === "article") {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (type === 'youtube' || type === 'pdf') {
        e.preventDefault();
        e.returnValue = 'You have content playing. Are you sure you want to leave?';
        return 'You have content playing. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }
}, [isOpen, type]);


  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'youtube':
        return (
          <YouTubeModal
            content={content}
            isLoading={isLoading}
            hasError={hasError}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        );
      case 'image':
        return (
          <ImageModal
            content={content}
            altText={metadata?.alt || title || 'Project image'}
            isLoading={isLoading}
            hasError={hasError}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        );
      case 'figma':
        return (
          <FigmaModal
            content={content}
            isLoading={isLoading}
            hasError={hasError}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        );
      case 'article':
        return (
          <ArticleModal
                  content={content}
                  isLoading={false} 
                  hasError={hasError}
                  metadata={metadata}
                  onLoad={() => {}}
                  onError={() => setHasError(true)}
                />
        );
      case 'pdf':
        return (
          <PdfModal
            content={content}
            isLoading={isLoading}
            hasError={hasError}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        );
      default:
        return (
          <div className="modal-error">
            <div className="error-icon">❓</div>
            <h4>Unsupported Content Type</h4>
            <p>This content cannot be displayed.</p>
          </div>
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <div className="modal-type-badge">{type.toUpperCase()}</div>
          <h3 className="modal-title">{title || 'Project Content'}</h3>
          {metadata && (
            <div className="modal-metadata">
              {metadata.author && <span>By {metadata.author}</span>}
              {metadata.date && <span>{metadata.date}</span>}
              {metadata.readTime && <span>{metadata.readTime} read</span>}
              {metadata.pageCount && <span>{metadata.pageCount} pages</span>}
            </div>
          )}
        </div>

        <div className="modal-body">
          {renderContent()}
        </div>

        <div className="modal-footer">
          <p className="modal-warning">
            {type === 'youtube' || type === 'pdf' 
              ? '⚠️ Content will pause if you navigate away' 
              : '⚠️ Changes may not be saved if you navigate away'}
          </p>
        </div>
      </div>
    </div>
  );
}