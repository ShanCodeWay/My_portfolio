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
  
    <section id="home"  className={`hero ${theme} pb-24 md:pb-32 scroll-animate`}>
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
  {/* GitHub */}
  <a href="https://github.com/ShanCodeWay" aria-label="GitHub" target="_blank" rel="noreferrer" className="socialIcon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.6 2.99 8.5 7.14 9.9.52.1.71-.23.71-.5v-1.77c-2.9.63-3.5-1.4-3.5-1.4-.47-1.2-1.15-1.52-1.15-1.52-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.57 2.42 1.12 3 .86.09-.67.36-1.12.65-1.38-2.31-.26-4.74-1.16-4.74-5.15 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.74 1.06a9.5 9.5 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.9-1.33 2.74-1.06 2.74-1.06.55 1.4.2 2.44.1 2.7.64.73 1.03 1.66 1.03 2.8 0 4.0-2.44 4.9-4.76 5.15.37.32.69.95.69 1.92v2.86c0 .27.18.6.72.5 4.16-1.41 7.15-5.3 7.15-9.9C23.01 5.24 18.27.5 12 .5z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a href="https://www.linkedin.com/in/darshana-wijebahu/" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="socialIcon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.78v1.64h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.6 4.74 5.98V21H19v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.76V21H11V9z"/>
    </svg>
  </a>

  {/* X */}
  <a href="https://twitter.com/DWijebahu" aria-label="X" target="_blank" rel="noreferrer" className="socialIcon">
    <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/>
    </svg>
  </a>

  {/* Medium */}
  <a href="https://medium.com/@wijebahuwmpwdgb.20" aria-label="Medium" target="_blank" rel="noreferrer" className="socialIcon">
    <svg width="20" height="20" viewBox="0 -55 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <path d="M72.2009141,0 C112.076502,0 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,0 72.2009141,0 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 C223.601085,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a href="https://youtube.com/@darshanagayashanwijebahu8189?si=aGJYS-PKq5MI6S45" aria-label="YouTube" target="_blank" rel="noreferrer" className="socialIcon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.115C19.347 3.5 12 3.5 12 3.5s-7.347 0-9.388.571a2.994 2.994 0 00-2.11 2.115A31.24 31.24 0 000 12a31.24 31.24 0 00.502 5.814 2.994 2.994 0 002.11 2.115C4.653 20.5 12 20.5 12 20.5s7.347 0 9.388-.571a2.994 2.994 0 002.11-2.115A31.24 31.24 0 0024 12a31.24 31.24 0 00-.502-5.814zM9.75 15.568V8.432L15.568 12l-5.818 3.568z"/>
    </svg>
  </a>
</div>



                {/* skills */}
                <div className="flex flex-wrap gap-3">
                  {['React Native', 'Redux', 'Firebase', 'React', 'ML'].map((s) => (
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
                      className="p-2 rounded-full bg-[var(--hero-social-bg)]  hover:scale-105 transition focus:outline-none focus:ring-4"
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
                  <Link href="/#projects" className="primaryButton">
  <span>View Projects</span>
</Link>

                  <a href="/resume.pdf" download="Darshana_Wijebahu_Resume.pdf" className="primaryButton secondaryButton">
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
                <Link href="#projects" className="glow-underline">Projects</Link>
                <a href="#contact" className="glow-underline">Contact</a>

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