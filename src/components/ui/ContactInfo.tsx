import Link from 'next/link';
import React from 'react';

export default function ContactInfo() {
  return (
    <div className="contact-info-container">
      <div className="contact-card scroll-animate">
        <div className="contact-card-header">
          <h3 className="contact-card-title">Contact Information</h3>
          <div className="title-decoration"></div>
        </div>
        
        <div className="contact-items">
          {/* Phone */}
          <div className="contact-item group">
            <div className="contact-icon-wrapper">
              <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="icon-glow"></div>
            </div>
            <div className="contact-details">
              <p className="contact-label">Phone</p>
              <p className="contact-value">
                <Link href="tel:+94711145457">+94 71 114 5457</Link>
              </p>
            </div>
          </div>
          
          {/* Email */}
          <div className="contact-item group">
            <div className="contact-icon-wrapper">
              <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="icon-glow"></div>
            </div>
            <div className="contact-details">
              <p className="contact-label">Email</p>
              <p className="contact-value">
                <Link href="mailto:darshana.wijebahu@gmail.com">darshana.wijebahu@gmail.com</Link>
              </p>
            </div>
          </div>
          
          {/* Location */}
          <div className="contact-item group">
            <div className="contact-icon-wrapper">
              <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="icon-glow"></div>
            </div>
            <div className="contact-details">
              <p className="contact-label">Location</p>
              <p className="contact-value">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Colombo,Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Colombo, Sri Lanka
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
