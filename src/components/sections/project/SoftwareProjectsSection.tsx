import React from 'react';
import { projectsSoftware } from '@/data/projectsSoftware';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function SoftwareProjectsSection() {
  return (
    <section
      id="software-projects"
      className="projects-section variant-software"
      aria-labelledby="software-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="Software Projects"
          subtitle="Mobile, web, and desktop apps I’ve built and shipped"
        />

        <div className="projects-grid">
          {projectsSoftware.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="View all software projects on GitHub"
          >
            View more on GitHub
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
