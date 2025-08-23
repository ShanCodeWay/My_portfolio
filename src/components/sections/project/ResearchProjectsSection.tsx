import React from 'react';
import { projectsResearch } from '@/data/projectsResearch';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function ResearchProjectsSection() {
  return (
    <section
      id="research-projects"
      className="projects-section variant-research"
      aria-labelledby="research-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="Research"
          subtitle="Academic work, reports, and case studies"
        />

        <div className="projects-grid">
          {projectsResearch.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://drive.google.com/your-research-folder"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="Open research documents"
          >
            View research docs
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
