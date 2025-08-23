import React from 'react';
import { projectsUI } from '@/data/projectsUI';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function UIProjectsSection() {
  return (
    <section
      id="ui-projects"
      className="projects-section variant-ui"
      aria-labelledby="ui-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="UI/UX"
          subtitle="Interaction, prototypes, and product design"
        />

        <div className="projects-grid">
          {projectsUI.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://www.figma.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="View Figma community profile"
          >
            View on Figma
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
