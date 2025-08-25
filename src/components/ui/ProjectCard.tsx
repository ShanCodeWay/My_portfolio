import React, { useState } from 'react';
import { Project } from '@/types/project';
import MultiFormatModal, { ModalType } from './MultiFormatModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('youtube');
  const [modalContent, setModalContent] = useState('');

  const detectContentType = (url: string): ModalType => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('figma.com')) return 'figma';
    if (url.includes('medium.com') || url.includes('blog')) return 'article';
    if (url.endsWith('.pdf')) return 'pdf';
    if (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) return 'image';
    return 'youtube'; // default
  };

  const handleContentClick = (e: React.MouseEvent, url: string, type: ModalType) => {
    e.preventDefault();
    setModalType(type);
    setModalContent(url);
    setIsModalOpen(true);
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
  const type = detectContentType(project.links.demo);
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
  const type = detectContentType(project.links.documentation);
  // prevent duplicate article type here too
  if (!(type === 'article' && project.links.article)) {
    contentTypes.push({ type, url: project.links.documentation });
  }
}


  return (
    <>
      <div 
        className="project-card scroll-animate group"
        style={{ 
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div className="project-image-container overflow-hidden rounded-xl relative">
          <div className="project-image-placeholder">
            [Project Screenshot]
          </div>
          <div className="project-overlay">
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
                    <span>View Code</span>
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
          <p className="project-description">{project.description}</p>
          
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
                <span>View Code</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19C7.89543 19 7 18.1046 7 17C7 15.8954 7.89543 15 9 15C10.1046 15 11 15.8954 11 17C11 18.1046 10.1046 19 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9C13.8954 9 13 8.10457 13 7C13 5.89543 13.8954 5 15 5C16.1046 5 17 5.89543 17 7C17 8.10457 16.1046 9 15 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17V13C7 11.6739 6.47322 10.4021 5.53553 9.46447C4.59785 8.52678 3.32608 8 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 7V13C17 14.3261 17.5268 15.5979 18.4645 16.5355C19.4021 17.4732 20.6739 18 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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