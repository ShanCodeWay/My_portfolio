import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Image from 'next/image';

const skills = ['React Native', 'Node.js', 'Python', 'AI/ML', 'TypeScript', 'Firebase', 'TensorFlow', 'Next.js'];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-background">
        <div className="background-glow accent-glow"></div>
        <div className="background-glow primary-glow"></div>
      </div>
      
      <div className="about-container">
        <SectionTitle 
          title="About Me" 
          subtitle="Passionate developer creating innovative solutions"
        >
          {/* You can put any children here, or an empty fragment if nothing is needed */}
        </SectionTitle>
        
        <div className="about-content">
          <div className="about-text scroll-animate">
            <div className="about-description">
              <p className="description-paragraph">
                I&apos;m passionate software engineer with expertise in building <span className="highlight-text">AI-powered applications</span> and 
                cross-platform mobile solutions using <span className="highlight-text">React Native</span>.
              </p>
              <p className="description-paragraph">
                My work focuses on creating seamless user experiences while implementing robust backend 
                systems and machine learning models that solve real-world problems.
              </p>
            </div>
            
            <div className="skills-section">
              <h4 className="skills-title">Skills & Technologies</h4>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="skill-tag"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {skill}
                    <span className="skill-tag-glow"></span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="action-buttons">
              <a 
                href="#contact" 
                className="action-btn primary-btn"
              >
                Get In Touch
                <span className="btn-glow"></span>
              </a>
              <a 
                href="/Darshana_Wijebahu_SE.pdf" 
                download 
                className="action-btn secondary-btn"
              >
                Download Resume
                <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="profile-container scroll-animate">
            <div className="profile-image">
             <Image
                    src="/images/profile/avatar2.webp"
                    alt="Darshana Wijebahu"
                    fill
                    className="img-fit"
                    priority
                    />

              <div className="profile-glow"></div>
              <div className="profile-decoration">
                <div className="decoration-item"></div>
                <div className="decoration-item"></div>
                <div className="decoration-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}