"use client";

import React from 'react';
import SocialLink from './SocialLink';
import './_footerStyles.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Background with blur effect */}
      <div className="footer-background"></div>
      
      {/* Decorative elements */}
      <div className="footer-decoration footer-dec-1"></div>
      <div className="footer-decoration footer-dec-2"></div>
      <div className="footer-decoration footer-dec-3"></div>
      
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {new Date().getFullYear()}{' '}
            <span className="footer-name">Darshana Wijebahu</span>
            . All rights reserved.
          </p>

          <div className="footer-socials">
            <SocialLink 
              href="https://github.com/ShanCodeWay" 
              icon="github" 
              //network="github"
            />
            <SocialLink 
              href="https://www.linkedin.com/in/darshana-wijebahu/" 
              icon="linkedin" 
              //network="linkedin"
            />
            <SocialLink 
              href="https://twitter.com/DWijebahu" 
              icon="x" 
              //network="twitter"
            />
            <SocialLink
              href="https://medium.com/@wijebahuwmpwdgb.20"
              icon="medium"
              //network="medium"
            />
            <SocialLink 
              href="https://youtube.com/@darshanagayashanwijebahu8189?si=aGJYS-PKq5MI6S45"
              icon="youtube"
              //network="youtube"
            />
            <SocialLink 
              href="mailto:darshana.wijebahu@example.com" 
              icon="mail" 
              //network="mail"
            />

          </div>
        </div>

        {/* <div className="footer-bottom">
          <p className="footer-message">
            Crafted with passion and attention to detail
          </p>
        </div> */}
      </div>
    </footer>
  );
}