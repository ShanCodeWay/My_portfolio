"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "../ui/Particles";
import ScrollIndicator from "../ui/ScrollIndicator";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from '@/components/contexts/ThemeContext';
import QRCodeResume from "../ui/QRCodeResume";

function Typewriter({ words = ["Full Stack Developer", "React Native • AI • Cloud-native"], speed = 80 }: { words?: string[]; speed?: number; }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(i => i + 1);
        if (charIndex + 1 === current.length) setTimeout(() => setIsDeleting(true), 900);
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(i => i - 1);
        if (charIndex - 1 === 0) { setIsDeleting(false); setWordIndex(w => (w + 1) % words.length); }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed]);

  return (
    <span className="typewriter">
      <span className="whitespace-nowrap">{text}</span>
      <span className="caret ml-1" aria-hidden></span>
    </span>
  );
}

export default function HeroSection(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

    const particleColors = theme === 'dark' 
  ? [
      'rgb(147, 51, 234)',   // purple-600
      'rgb(6, 182, 212)',    // cyan-500
      'rgb(234, 179, 8)'     // amber-400
    ] 
  : [
      'rgb(96, 165, 250)',   // sky-400 (soft blue)
      'rgb(244, 114, 182)',  // pink-400
      'rgb(132, 204, 22)',   // lime-500
    ];




  return (
    <section className={`hero ${theme} pb-24 md:pb-32`}>
      {/* Background elements */}
      <div className="heroGrid"></div>
      <div className="absolute inset-0 bg-[var(--hero-glow)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Particles layer */}
      <Particles count={90} color={particleColors} />

      <div style={{ marginTop: '40px' }} className="contentContainer">
        <div className="flex items-start justify-between gap-6">
          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* LEFT: Avatar + socials + skills */}
              <div className="flex flex-col items-center md:items-start gap-6">


            <div className="avatarCard glow-effect">
              <motion.div
                className="absolute inset-0 z-0"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <Image
                  src="/images/profile/avatar.png"
                  alt="Darshana Wijebahu"
                  fill
                  sizes="(max-width: 768px) 300px, 280px"  
                  className="object-cover rounded-full"
                />
              </motion.div>

              {/* Shine overlay DIV */}
              <div className="shineOverlay"></div>

              {/* Existing halo */}
              <div className="avatarHalo glow-halo"></div>
            </div>




                {/* Socials */}
                <div className="flex gap-3 items-center">
                  <a href="https://github.com/" aria-label="GitHub" target="_blank" rel="noreferrer" className="socialIcon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.6 2.99 8.5 7.14 9.9.52.1.71-.23.71-.5v-1.77c-2.9.63-3.5-1.4-3.5-1.4-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.57 2.42 1.12 3 .86.09-.67.36-1.12.65-1.38-2.31-.26-4.74-1.16-4.74-5.15 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.74 1.06a9.5 9.5 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.9-1.33 2.74-1.06 2.74-1.06.55 1.4.2 2.44.1 2.7.64.73 1.03 1.66 1.03 2.8 0 4.0-2.44 4.9-4.76 5.15.37.32.69.95.69 1.92v2.86c0 .27.18.6.72.5 4.16-1.41 7.15-5.3 7.15-9.9C23.01 5.24 18.27.5 12 .5z" fill="currentColor" />
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="socialIcon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.78v1.64h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.6 4.74 5.98V21H19v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.76V21H11V9z" fill="currentColor" />
                    </svg>
                  </a>

                  <a href="https://twitter.com/" aria-label="Twitter" target="_blank" rel="noreferrer" className="socialIcon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 7.548c.014.2.014.4.014.6 0 6.1-4.647 13.146-13.146 13.146-2.612 0-5.042-.762-7.087-2.07.366.044.74.06 1.116.06 2.164 0 4.156-.74 5.742-1.987-2.024-.04-3.724-1.37-4.314-3.205.29.056.59.088.9.088.437 0 .861-.06 1.263-.17-2.118-.43-3.716-2.295-3.716-4.538v-.06c.625.346 1.333.556 2.088.582-1.236-.83-2.05-2.244-2.05-3.847 0-.84.228-1.626.625-2.306 2.266 2.78 5.655 4.6 9.475 4.79-.08-.33-.118-.67-.118-1.013 0-2.445 1.98-4.427 4.427-4.427 1.272 0 2.42.536 3.227 1.395.998-.197 1.94-.56 2.79-1.064-.327 1.024-1.02 1.883-1.927 2.422z" fill="currentColor" />
                    </svg>
                  </a>
                </div>

                {/* skills */}
                <div className="flex flex-wrap gap-3">
                  {['React Native', 'Redux', 'Firebase', 'AWS', 'ML'].map((s) => (
                    <span key={s} className="skillBadge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Name + role + CTA */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                <div className="w-full flex items-center justify-between">
                  <div />
                  {/* theme toggle */}
                  <div className="flex items-center gap-4 mt-26">
                    <span className="text-sm text-[var(--hero-text)]/60 hidden md:block">Theme</span>
                    <button
                      aria-pressed={theme === 'dark'}
                      onClick={toggleTheme}
                      className="p-2 rounded-full bg-[var(--hero-social-bg)] border border-[var(--hero-social-border)] hover:scale-105 transition focus:outline-none focus:ring-4"
                      title="Toggle theme"
                    >
                      {theme === 'dark' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                      )}
                    </button>
                  </div>
                 
                </div>

                <motion.h1 className="heading">
                  Hi, I'm <br />
                  <span className="gradientText">Darshana Wijebahu</span>
                </motion.h1>

                        <div className="flex justify-center md:justify-start mt-4 mb-2">
                                <QRCodeResume 
                                url="https://your-portfolio.com/resume" 
                                size={80}
                                className="md:hidden" // Show only on mobile
                                />
  </div>

                <div className="mt-2">
                  <Typewriter words={["Full Stack Developer", "React Native • AI • Cloud-native", "APIs • Redux • Real-time Apps"]} speed={70} />
                </div>

                <p className="subheading max-w-xl mt-3">
                  I build polished mobile and web apps, integrate APIs, and add ML-powered features to improve user experience. I enjoy converting product ideas into reliable, maintainable code.
                </p> 

                {/* CTA buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="#projects" className="primaryButton">
  <span>View Projects</span>
</Link>

                  <a href="/resume.pdf" download="Darshana_Wijebahu_Resume.pdf" className="secondaryButton">
                    Download Resume
                  </a>
                </div>

                <div className="mt-6 w-full">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-[var(--hero-text)]/60">Available for:</span>
                    <span className="px-2 py-1 rounded-md text-xs bg-[var(--hero-card-bg)]">Freelance</span>
                    <span className="px-2 py-1 rounded-md text-xs bg-[var(--hero-card-bg)]">Internships</span>
                    <span className="px-2 py-1 rounded-md text-xs bg-[var(--hero-card-bg)]">Collaborations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* decorative footer row & scroll indicator */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-[var(--hero-text)]/50">Crafted with ❤️ — React / React Native / Cloud</div>
              <div className="flex items-center gap-6">
                <div className="hidden md:block text-sm text-[var(--hero-text)]/50">Quick links:</div>
                <Link href="#projects" className="text-sm text-[var(--hero-text)]/70 hover:underline">Projects</Link>
                <a href="#contact" className="text-sm text-[var(--hero-text)]/70 hover:underline">Contact</a>
              </div>
            </div>

            <div className="mt-8">
              <ScrollIndicator />
            </div>
          </motion.div>
        </div>
      </div>
                <QRCodeResume 
                url="https://your-portfolio.com/resume" 
                size={100}
                position="fixed"
                className="hidden md:block"
                showLabel={true}
                />
  
    </section>
  );
}