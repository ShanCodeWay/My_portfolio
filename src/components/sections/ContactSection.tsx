import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ContactForm from '../ui/ContactForm';
import ContactInfo from '../ui/ContactInfo';
import FollowMe from '../ui/FollowMe';

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-background">
        <div className="background-glow secondary-glow"></div>
        <div className="background-glow accent-glow"></div>
        <div className="background-glow primary-glow"></div>
      </div>
      
      <div className="contact-container">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Let's build something amazing together"
        />
        
        <div className="contact-content">
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
          
          <div className="contact-info-wrapper">
            <ContactInfo />
            
            <div style={{ marginTop: '2rem' }}>
              <FollowMe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}