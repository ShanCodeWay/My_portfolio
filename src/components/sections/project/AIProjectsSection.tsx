import React from 'react';
import { projectsAI } from '@/data/projectsAI';
import ProjectCard from '../../ui/ProjectCard';
import SectionTitle from '../../ui/SectionTitle';
import './_projectsSection.css';

export default function AIProjectsSection() {
  return (
    <section
      id="ai-projects"
      className="projects-section variant-ai"
      aria-labelledby="ai-projects-title"
    >
      <div className="projects-background">
        <div className="background-glow primary-glow" />
        <div className="background-glow secondary-glow" />
        <div className="background-glow accent-glow" />
      </div>

      <div className="projects-container">
        <SectionTitle
          title="AI & ML Projects"
          subtitle="Models, experiments, and intelligent systems"
        />

        <div className="projects-grid">
          {projectsAI.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://github.com/yourusername?tab=repositories&q=ai"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            aria-label="View more AI projects"
          >
            Explore AI work
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
