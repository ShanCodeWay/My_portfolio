'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './cv-styles.css';
import Header from '@/components/components/Header';
import Image from "next/image";
import FollowMe from '@/components/ui/FollowMe';
import Link from 'next/link';

export default function CVPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isPrinting, setIsPrinting] = useState(false);
  const sectionRefs = useRef({});
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Set up intersection observer for section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref instanceof Element) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      observer.disconnect();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Darshana_Wijebahu_SE.pdf';
    link.download = 'Darshana_Wijebahu_SE.pdf';
    link.click();
  };

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'activities', label: 'Activities' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'referees', label: 'Referees' }
  ];

  interface SectionRefs {
    [key: string]: HTMLElement | null;
  }

  const setSectionRef = (element: HTMLElement | null, id: string): void => {
    (sectionRefs.current as SectionRefs)[id] = element;
  };

  return (
    <>
      <Header />
      <div className={`cv-container ${isPrinting ? 'print-mode' : ''}`}>
        {/* Hero Section */}
<motion.div 
  className="cv-hero"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Top Row: Avatar + Name/Title + Contact */}
  <div className="cv-hero-top">
    <div className="cv-hero-left">
      <div className="avatar-container">
        <motion.div
          className="avatar-wrapper"
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          onClick={() => setIsAvatarOpen(true)}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="/images/profile/avatar.png"
            alt="Darshana Wijebahu"
            width={200}
            height={200}
            className="avatar-image"
          />
        </motion.div>
      </div>
      <div className="cv-hero-text">
        <h1>Darshana Wijebahu</h1>
        <p className="cv-hero-subtitle">Software Engineer</p>
      </div>
    </div>

<motion.div 
  className="cv-hero-contact"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <div className="contact-item">
    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <Link href="mailto:darshana.wijebahu@gmail.com">darshana.wijebahu@gmail.com</Link>
  </div>

  <div className="contact-item">
    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.9 1.37l1.14 3.41a2 2 0 01-.45 2.11l-1.7 1.7a16 16 0 006.36 6.36l1.7-1.7a2 2 0 012.11-.45l3.41 1.14a2 2 0 011.37 1.9V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
    </svg>
    <Link href="tel:+94711145457">(+94) 71 114 5457</Link>
  </div>

  <div className="contact-item">
    <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10c0-4.418-3.582-8-8-8S4 7.582 4 12c0 5.5 8 10 8 10z" />
    </svg>
    <span>Rikillagaskada, Sri Lanka</span>
  </div>
</motion.div>

  </div>

  {/* Summary */}
  <motion.p 
    className="cv-hero-description"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.7 }}
  >
    IT undergraduate with practical training in finance systems and software engineering internships. 
    Experienced in React, React Native, and multimedia/video editing tools.
  </motion.p>

  {/* Actions */}
  {!isPrinting && (
    <div className="cv-hero-actions">
      <motion.button 
        onClick={handleDownload} 
        className="btn btn-primary"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="btn-icon">📄</span> Download PDF
      </motion.button>
      <motion.button 
        onClick={handlePrint} 
        className="btn btn-secondary"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="btn-icon">🖨️</span> Print CV
      </motion.button>
    </div>
  )}
</motion.div>


        {/* Main Content */}
        <main className="cv-main">
          <div className="cv-content-grid">
            {/* Left Column */}
            <div className="cv-left-column">
              {/* Profile Section */}
              <section 
                id="profile" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'profile')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Profile Summary</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="profile-text">
                    IT undergraduate at University of Moratuwa with practical training in finance systems 
                    and software engineering internships. Experienced in React, React Native, Redux, Firebase, 
                    and multimedia/video editing tools. Strong collaborator with experience working on cross-functional teams.
                  </p>
    <div style={{ marginTop: '2rem' }}>
              <FollowMe />
            </div>
                </motion.div>
              </section>

              {/* Education Section */}
              <section 
                id="education" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'education')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Education</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="timeline">
                    <motion.div 
                      className="timeline-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="education-header">
                          <img src="/images/cvIcons/moratuwaLogo.png" alt="University of Moratuwa" className="section-content-icon" />
                          <div>
                            <h3>B.Sc. (Hons) in Information Technology and Management</h3>
                            <p className="timeline-period">2021 – 2025 (Expected)</p>
                            <p>University of Moratuwa, Sri Lanka</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="timeline-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="education-header">
                          <img src="/images/cvIcons/CALogo.png" alt="Institute of Chartered Accountants" className="section-content-icon" />
                          <div>
                            <h3>Accounting & Business / Business Level 2</h3>
                            <p className="timeline-period">Since 2019</p>
                            <p>Institute of Chartered Accountants of Sri Lanka</p>
                          </div>
                        </div>
                      </div>
                      
                   <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <div className="education-header">
                          <img src="/images/cvIcons/poramadullaLogo.png" alt="poramadullaLogo" className="section-content-icon" />
                          <div>
                            <h3>Poramadulla Central College, Hanguranketha</h3>
                            <p className="timeline-period">2019</p>
                             <p>GCE Advanced Level – Commerce Stream</p>
                        <p>2 A's (Business Studies, Economics), 1 B (Accounting) | District Rank: 21</p>
                          </div>
                        </div>
                       
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>

              {/* Activities Section */}
              <section 
                id="activities" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'activities')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Extracurricular Activities</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="activities-grid">
         
               
           
                  </div>
                     <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/fitmoments_logo.jpg" alt="FIT Moments" className="section-content-icon" />
                      <div>
                        <h3>Video Editor</h3>
                        <span className="experience-period">FIT Moments (Faculty of IT Students' Union, UoM) — Aug 2023 – Jul 2024 (1 year)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Edited event videos and performed color grading using After Effects and DaVinci Resolve</li>
                      <li>Delivered promotional content for campus events</li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/moraSpiritLogo.png" alt="MoraSpirit Organization" className="section-content-icon" />
                      <div>
                        <h3>Video Editor</h3>
                        <span className="experience-period">MoraSpirit Organization — Jun 2023 – Jun 2024 (1 year, 1 month)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Produced and streamed live event footage; coordinated editing workflows</li>
                      <li>Collaborated with event teams to capture highlights and promotional reels</li>
                    </ul>
                  </motion.div>

                   <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/seds_mora_logo.jpg" alt="FIT Moments" className="section-content-icon" />
                      <div>
                        <h3>Video Editor</h3>
                        <span className="experience-period">FIT Moments (Faculty of IT Students' Union, UoM) — Aug 2023 – Jul 2024 (1 year)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Edited event videos and performed color grading using After Effects and DaVinci Resolve</li>
                      <li>Delivered promotional content for campus events</li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/nTeamLOGO.png" alt="MoraSpirit Organization" className="section-content-icon" />
                      <div>
                        <h3>member</h3>
                        <span className="experience-period">Nature Team — Jun 2023 – Jun 2024 (1 year, 1 month)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Produced and streamed live event footage; coordinated editing workflows</li>
                      <li>Collaborated with event teams to capture highlights and promotional reels</li>
                    </ul>
                  </motion.div>
                </motion.div>
              </section>

              {/* Additional Qualifications Section */}
              <section 
                id="qualifications" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'qualifications')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Additional Qualifications</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <ul className="qualifications-list">
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <img src="/images/cvIcons/openUniLogo.png" alt="Open University of Sri Lanka" className="section-content-icon" />
                      HRM Certificate Course – The Open University of Sri Lanka (2020)
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <img src="/images/cvIcons/CALogo.png" alt="Institute of Chartered Accountants of Sri Lanka" className="section-content-icon" />
                      Business Level 2 – Institute of Chartered Accountants of Sri Lanka (2019)
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <img src="/images/cvIcons/sibaLogo.png" alt="SIBA Campus" className="section-content-icon" />
                      Diploma in Information Technology – SIBA Campus (2019)
                    </motion.li>
                  </ul>
                </motion.div>
              </section>

              {/* Skills Section */}
      
            </div>

            {/* Right Column */}
            <div className="cv-right-column">
              {/* Experience Section */}
              <section 
                id="experience" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'experience')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Professional Experience</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/cebLogo.png" alt="Ceylon Electricity Board" className="section-content-icon" />
                      <div>
                        <h3>Provision of Practical Training (Internship)</h3>
                        <span className="experience-period">Ceylon Electricity Board (CEB) — Jul 2024 – Dec 2024 (6 months)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Practical training as part of ICA program at CEB</li>
                      <li>Contributed to finance-related digital workflows and data handling tasks</li>
                      <li>Gained exposure to reporting and Excel automation processes</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="experience-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="experience-header">
                      <img src="/images/cvIcons/ScienterLogo.png" alt="Scienter Technologies" className="section-content-icon" />
                      <div>
                        <h3>Software Engineer Intern</h3>
                        <span className="experience-period">Scienter Technologies (Pte) Ltd — Dec 2023 – Jun 2024 (7 months)</span>
                      </div>
                    </div>
                    <ul className="experience-list">
                      <li>Completed a 7-month mandatory third-year internship (Grade A-), contributing to the development of the MyiFi, LuckyWallet Revamp, and SfinOTO mobile apps.</li>
<li>Converted key screens and the codebase from JavaScript to TypeScript and applied Atomic Design principles to create reusable components.</li>
<li>Built a reusable camera component using react-native-vision-camera (TypeScript) and implemented AsyncStorage for offline access.</li>
<li>Integrated REST APIs for KYC, account data, and payments; implemented biometric authentication and Redux Toolkit for state management.</li>
<li>Modernized UI screens based on Figma designs, prepared Android test builds (APK/AAB), and fixed cross-platform issues (including iOS camera bugs).</li>
<li>Authored technical articles sharing learnings (React Native + TypeScript, camera component, app security) and maintained project documentation; participated in daily standups with backend and QA teams.</li>

                    </ul>
                  </motion.div>

                 
                </motion.div>
              </section>

              {/* Projects Section */}
              <section 
                id="projects" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'projects')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Projects</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
<div className="project-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {/* CardioAI */}
  <motion.div
    className="project-card p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">CardioAI – AI-Powered Music Therapy</h3>
    <span className="project-tag text-xs text-gray-500">AI & Machine Learning</span>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      Developed a multimodal AI platform integrating Python, Librosa, LightGBM, and TensorFlow with React Native for real-time heart rate streaming and personalized music therapy.
    </p>
    <p className="mt-2 text-xs text-gray-500">Tech Stack: Python, React Native, Flask, TensorFlow, Redux</p>
    <a href="https://youtu.be/Cj91poM8vm8" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-3 inline-block">Demo Video</a>
  </motion.div>

  {/* ElectraTrack */}
  <motion.div
    className="project-card p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">ElectraTrack – Transformer Data Management</h3>
    <span className="project-tag text-xs text-gray-500">Desktop Application</span>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      Python Tkinter application for the Ceylon Electricity Board automating transformer tracking, real-time search, secure login, and Excel export.
    </p>
    <p className="mt-2 text-xs text-gray-500">Tech Stack: Python, Tkinter, Pandas, OpenPyXL</p>
    <a href="https://youtu.be/eVZFVFrxCCw" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-3 inline-block">Demo Video</a>
  </motion.div>

  {/* PhishGuard */}
  <motion.div
    className="project-card p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">PhishGuard – AI Phishing SMS Detection</h3>
    <span className="project-tag text-xs text-gray-500">Mobile Application</span>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      React Native app with real-time phishing detection, AI text-classification, light/dark modes, and manual/automatic scanning.
    </p>
    <p className="mt-2 text-xs text-gray-500">Tech Stack: React Native, Redux Thunk, TypeScript</p>
    <a href="https://youtu.be/h3SN8Pj117k" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-3 inline-block">Demo Video | APK</a>
  </motion.div>

  {/* MyiFi, LuckyWallet & SFin */}
  <motion.div
    className="project-card p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.3 }}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">MyiFi, LuckyWallet & SFin</h3>
    <span className="project-tag text-xs text-gray-500">Internship Projects</span>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      Contributed to three fintech mobile apps focusing on front-end development, API integrations, UI/UX modernization, and biometric authentication.
    </p>
    <p className="mt-2 text-xs text-gray-500">Tech Stack: React Native, TypeScript, Redux Toolkit, Firebase, Figma</p>
  </motion.div>

  {/* QA Automation */}
  <motion.div
    className="project-card p-5 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-transform transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.4 }}
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">QA Automation – API & UI Testing</h3>
    <span className="project-tag text-xs text-gray-500">Software Quality Assurance</span>
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
      Automated testing framework using Selenium, RestAssured, Cucumber, and Jenkins CI/CD pipelines, reducing manual QA efforts by 50%.
    </p>
    <p className="mt-2 text-xs text-gray-500">Tech Stack: Selenium, RestAssured, Cucumber, TestNG, Jenkins, Git</p>
    <a href="https://github.com/ShanCodeWay/ITQA_Assignment_Group_41" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-3 inline-block">GitHub</a>
  </motion.div>
</div>


                </motion.div>
              </section>


        <section 
                id="skills" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'skills')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Technical Skills</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="skills-grid">
                    <motion.div 
                      className="skill-category"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <h4>Frontend Development</h4>
                      <div className="skill-tags">
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">React Native</span>
                        <span className="skill-tag">Redux</span>
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">HTML/CSS</span>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="skill-category"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <h4>Backend & Databases</h4>
                      <div className="skill-tags">
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">Firebase</span>
                        <span className="skill-tag">MongoDB</span>
                        <span className="skill-tag">API Integration</span>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="skill-category"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h4>Multimedia Tools</h4>
                      <div className="skill-tags">
                        <span className="skill-tag">Adobe After Effects</span>
                        <span className="skill-tag">DaVinci Resolve</span>
                        <span className="skill-tag">Color Grading</span>
                        <span className="skill-tag">Video Editing</span>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="skill-category"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <h4>Other Tools</h4>
                      <div className="skill-tags">
                        <span className="skill-tag">Git</span>
                        <span className="skill-tag">Excel Automation</span>
                        <span className="skill-tag">Agile Methodologies</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>
              {/* Referees Section */}
              <section 
                id="referees" 
                className="cv-section"
                ref={(el) => setSectionRef(el, 'referees')}
              >
                <motion.div 
                  className="section-header"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Referees</h2>
                </motion.div>
                <motion.div 
                  className="section-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="referees-grid">
                    <motion.div 
                      className="referee-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3>Dr. Saminda Premaratne</h3>
                      <p>Lecturer, Faculty of IT</p>
                      <p>University of Moratuwa</p>
                      <div className="referee-contact">
                        <p>📧 samindap@uom.lk</p>
                        <p>📱 (+94) 71 441 3362</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="referee-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <h3>Mr. Kulan Sachinthana</h3>
                      <p>Senior Software Engineer</p>
                      <p>London Stock Exchange Group (LSEG)</p>
                      <div className="referee-contact">
                        <p>📧 Kulan.Sachinthana@lseg.com</p>
                        <p>📱 (+94) 71 645 6361</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>
            </div>
          </div>

          {isAvatarOpen && (
  <motion.div
    className="avatar-modal"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsAvatarOpen(false)} 
  >
    <motion.div
      className="avatar-modal-content"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src="/images/profile/avatar.png"
        alt="Darshana Wijebahu"
        width={400}
        height={400}
        className="avatar-large"
      />
    </motion.div>
  </motion.div>
)}

        </main>
      </div>
    </>
  );
}