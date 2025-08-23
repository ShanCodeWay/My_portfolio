import React from 'react';
import { projectsWriting } from '@/data/projectsWriting';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function WritingProjectsSection() {
  return (
    <section
      id="writing-projects"
      className="projects-section variant-writing"
      aria-labelledby="writing-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="Writing & Articles"
          subtitle="Tutorials, technical docs, and captions"
        />

        <div className="projects-grid">
          {projectsWriting.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://medium.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="Read more on Medium"
          >
            Read on Medium
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
