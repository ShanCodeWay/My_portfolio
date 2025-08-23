import React from 'react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
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
              {project.links.demo && (
                <a 
                  href={project.links.demo} 
                  className="project-link-overlay demo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Live Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
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
          {project.links.demo && (
            <a 
              href={project.links.demo} 
              className="project-action-btn primary-action"
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: '0.3s' }}
            >
              <span>Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          {project.links.github && (
            <a 
              href={project.links.github} 
              className="project-action-btn secondary-action"
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: '0.4s' }}
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
  );
}