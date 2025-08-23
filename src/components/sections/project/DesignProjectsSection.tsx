import React from 'react';
import { projectsDesign } from '@/data/projectsDesign';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function DesignProjectsSection() {
  return (
    <section
      id="design-projects"
      className="projects-section variant-design"
      aria-labelledby="design-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="Design & Graphics"
          subtitle="Branding, social posts, and visual assets"
        />

        <div className="projects-grid">
          {projectsDesign.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://www.behance.net/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="View design work on Behance"
          >
            See Behance portfolio
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
