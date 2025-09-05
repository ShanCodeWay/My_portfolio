'use client';

import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { Project } from '@/types/project';
import MultiFormatModal, { ModalType } from './MultiFormatModal';

// Create a context to manage global video state
interface VideoContextType {
  currentlyPlaying: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

const VideoContext = createContext<VideoContextType>({
  currentlyPlaying: null,
  setCurrentlyPlaying: () => {},
});

// Provider component
export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  return (
    <VideoContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
      {children}
    </VideoContext.Provider>
  );
};

// Hook to use the video context
const useVideo = () => useContext(VideoContext);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(
    (project.ModalType as ModalType) || 'youtube'
  );
  const [modalContent, setModalContent] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the video context
  const { currentlyPlaying, setCurrentlyPlaying } = useVideo();
  
  // Generate a unique ID for this card's video
  const videoId = `${project.title}-${index}`;

  // Detect if device is touch capable
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const detectContentType = (url: string): ModalType => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('figma.com')) return 'figma';
    if (url.includes('medium.com') || url.includes('blog')) return 'article';
    if (url.endsWith('.pdf')) return 'pdf';
    if (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) return 'image';
    return 'youtube';
  };

  const getVideoSrc = (url?: string) => {
    if (!url) return '';

    // YouTube handling (normal & shorts)
    const youtubeMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    if (youtubeMatch) {
      const id = youtubeMatch[1];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${id}`;
    }

    // Google Drive handling
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    return '';
  };

  const handleContentClick = (
    e: React.MouseEvent,
    url: string,
    type: ModalType
  ) => {
    e.preventDefault();

    // store click coords
    document.documentElement.style.setProperty("--modal-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--modal-y", `${e.clientY}px`);

    setModalType(type);
    setModalContent(url);
    setIsModalOpen(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();

    document.documentElement.style.setProperty("--modal-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--modal-y", `${e.clientY}px`);

    if (youtubePreviewId) {
      setModalType("youtube");
      setModalContent(youtubeUrl ?? "");
      setIsModalOpen(true);
    } else if (project.ModalType === "image") {
      setModalType("image");
      setModalContent(project.image ?? "");
      setIsModalOpen(true);
    } else if (contentTypes.length > 0) {
      const firstContent = contentTypes[0];
      setModalType(firstContent.type);
      setModalContent(firstContent.url);
      setIsModalOpen(true);
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
      setCurrentlyPlaying(videoId); // Set this as the currently playing video
    }, 500); // 500ms delay before showing video
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(false);
    setIsVideoLoaded(false);
    
    // Only clear if this was the currently playing video
    if (currentlyPlaying === videoId) {
      setCurrentlyPlaying(null);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = () => {
    if (!isTouchDevice) return;
    
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    
    // Set a timeout for long press (500ms)
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouching(true);
      setIsHovering(true);
      setCurrentlyPlaying(videoId); // Set this as the currently playing video
    }, 500);
  };

  const handleTouchEnd = () => {
    if (!isTouchDevice) return;
    
    // Clear the timeout if user lifts finger before long press duration
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    
    // If we were in a long press state, reset it
    if (isTouching) {
      setIsTouching(false);
      setIsHovering(false);
      setIsVideoLoaded(false);
      
      // Only clear if this was the currently playing video
      if (currentlyPlaying === videoId) {
        setCurrentlyPlaying(null);
      }
    }
  };

  const handleTouchMove = () => {
    if (!isTouchDevice) return;
    
    // If user moves finger during touch, cancel the long press
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    
    if (isTouching) {
      setIsTouching(false);
      setIsHovering(false);
      setIsVideoLoaded(false);
      
      // Only clear if this was the currently playing video
      if (currentlyPlaying === videoId) {
        setCurrentlyPlaying(null);
      }
    }
  };

  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getButtonIcon = (type: ModalType) => {
    switch (type) {
      case 'youtube': return '▶';
      case 'image': return '🖼️';
      case 'figma': return '🎨';
      case 'article': return '📝';
      case 'pdf': return '📄';
      default: return '🔗';
    }
  };

  const getButtonLabel = (type: ModalType) => {
    switch (type) {
      case 'youtube': return 'Watch Demo';
      case 'image': return 'View Image';
      case 'figma': return 'View Prototype';
      case 'article': return 'Read Article';
      case 'pdf': return 'View PDF';
      default: return 'View Content';
    }
  };

  // Check what content types are available
  const contentTypes: { type: ModalType, url: string }[] = [];

  if (project.links.demo) {
    const type = project.ModalType
      ? (project.ModalType as ModalType) 
      : detectContentType(project.links.demo); 

    // prevent duplicate article type if demo is also Medium
    if (!(type === 'article' && project.links.article)) {
      contentTypes.push({ type, url: project.links.demo });
    }
  }

  if (project.links.prototype) {
    contentTypes.push({ type: 'figma', url: project.links.prototype });
  }

  if (project.links.article) {
    contentTypes.push({ type: 'article', url: project.links.article });
  }

  if (project.links.documentation) {
    const type = project.ModalType
      ? (project.ModalType as ModalType)
      : detectContentType(project.links.documentation);

    if (!(type === 'article' && project.links.article)) {
      contentTypes.push({ type, url: project.links.documentation });
    }
  }

  // Check if we have a YouTube URL for hover preview
  const youtubeUrl = contentTypes.find(content => content.type === 'youtube')?.url;
  const youtubePreviewId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      
      // Clean up video state when component unmounts
      if (currentlyPlaying === videoId) {
        setCurrentlyPlaying(null);
      }
    };
  }, [currentlyPlaying, videoId, setCurrentlyPlaying]);

  // Determine if we should show the video preview
  const shouldShowPreview = (isHovering || isTouching) && 
                           project.links.demo && 
                           currentlyPlaying === videoId;

  return (
    <>
      <div 
        className="project-card scroll-animate group"
        style={{ 
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div 
          className="project-image-container overflow-hidden rounded-xl relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          ref={containerRef}
        >
          <div className="project-image-placeholder relative">
            {project.image ? (
              <>
                <img 
                  src={project.image} 
                  alt={`${project.title} screenshot`} 
                  className="project-image"
                  // Removed onClick handler from image
                />
                
                {/* YouTube preview overlay - now clickable */}
                {shouldShowPreview && (
                  <div
                    className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10"
                    onClick={handleOverlayClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="w-full h-full">
                      <iframe
                        ref={videoRef}
                        className="w-full h-full"
                        src={getVideoSrc(project.links.demo)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsVideoLoaded(true)}
                        style={{ pointerEvents: 'none' }}
                      ></iframe>
                    </div>

                    {!isVideoLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="loader">Loading...</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile tap indicator */}
                {isTouchDevice && !isTouching && !isHovering && youtubePreviewId && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Long press to preview
                  </div>
                )}
              </>
            ) : (
              <span>[Project Screenshot]</span>
            )}
          </div>

         
          <div 
            className="project-overlay"
            onClick={handleOverlayClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="project-overlay-content">
              <h3 className="project-title-overlay">{project.title}</h3>
              <div className="project-links-overlay">
                {contentTypes.map((content, idx) => (
                  <a 
                    key={idx}
                    href="#"
                    className={`project-link-overlay ${content.type}-link`}
                    onClick={(e) => handleContentClick(e, content.url, content.type)}
                  >
                    <span className="content-type-text">{getButtonLabel(content.type)}</span>
                    <span className="content-type-icon">{getButtonIcon(content.type)}</span>
                  </a>
                ))}
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    className="project-link-overlay code-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span  className="content-type-text">View Code</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 19C7.89543 19 7 18.1046 7 17C7 15.8954 7.89543 15 9 15C10.1046 15 11 15.8954 11 17C11 18.1046 10.1046 19 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9C13.8954 9 13 8.10457 13 7C13 5.89543 13.8954 5 15 5C16.1046 5 17 5.89543 17 7C17 8.10457 16.1046 9 15 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 17V13C7 11.6739 6.47322 10.4021 5.53553 9.46447C4.59785 8.52678 3.32608 8 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 7V13C17 14.3261 17.5268 15.5979 18.4645 16.5355C19.4021 17.4732 20.6739 18 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">
            {project.description}
            
          </p>
          {project.download && (
              <>
                {" "}
                <a 
                  href={project.download} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="download-link"
                >
                  ⬇ Download
                </a>
              </>
            )}
        
          <div className="project-tags">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="project-tag"
                style={{ 
                  '--tag-index': idx,
                  animationDelay: `${idx * 0.1}s`,
                  transitionDelay: `${idx * 30}ms`
                } as React.CSSProperties}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="project-actions">
            {contentTypes.map((content, idx) => (
              <button
                key={idx}
                className={`project-action-btn ${content.type}-action`}
                onClick={(e) => handleContentClick(e, content.url, content.type)}
                style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
              >
                <span className="content-type-text">{getButtonLabel(content.type)}</span>
                <span className="content-type-icon">{getButtonIcon(content.type)}</span>
              </button>
            ))}
            {project.links.github && (
              <a 
                href={project.links.github} 
                className="project-action-btn secondary-action"
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${0.3 + contentTypes.length * 0.1}s` }}
              >
                <span className="content-type-text">View Code</span>
                 <span className="content-type-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19C7.89543 19 7 18.1046 7 17C7 15.8954 7.89543 15 9 15C10.1046 15 11 15.8954 11 17C11 18.1046 10.1046 19 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9C13.8954 9 13 8.10457 13 7C13 5.89543 13.8954 5 15 5C16.1046 5 17 5.89543 17 7C17 8.10457 16.1046 9 15 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17V13C7 11.6739 6.47322 10.4021 5.53553 9.46447C4.59785 8.52678 3.32608 8 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7V13C17 14.3261 17.5268 15.5979 18.4645 16.5355C19.4021 17.4732 20.6739 18 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg></span>
                
              </a>
            )}

            <button
              className="project-action-btn share-action"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: project.title,
                    text: project.description,
                    url: window.location.href,
                  }).catch((err) => console.error('Share failed:', err));
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              style={{ animationDelay: `${0.3 + (contentTypes.length + 1) * 0.1}s` }}
            >
              <span className="content-type-text">Share</span>
              <span className="content-type-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="8.59" y1="10.49" x2="15.42" y2="6.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <MultiFormatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        content={modalContent}
        title={project.title}
        metadata={{
          author: project.metadata?.author,
          date: project.metadata?.date,
          readTime: project.metadata?.readTime,
        }}
      />
    </>
  );
}