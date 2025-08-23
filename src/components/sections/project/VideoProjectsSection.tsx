import React from 'react';
import { projectsVideo } from '@/data/projectsVideo';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function VideoProjectsSection() {
  return (
    <section
      id="video-projects"
      className="projects-section variant-video"
      aria-labelledby="video-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="Video & Motion"
          subtitle="Edits, motion graphics, and animation"
        />

        <div className="projects-grid">
          {projectsVideo.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://www.youtube.com/@yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="View more videos on YouTube"
          >
            Watch on YouTube
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
