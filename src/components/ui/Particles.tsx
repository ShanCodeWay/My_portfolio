// In your Particles.tsx file
"use client";
import React, { useEffect, useState, useRef } from "react";

interface Particle {
  id: string;
  size: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticlesProps {
  count?: number;
  color?: string | string[];
}

// Helper function to convert hex/rgb to rgba with opacity
const applyOpacity = (color: string, opacity: number): string => {
  // If it's already an rgba color
  if (color.startsWith('rgba(')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  
  // If it's an rgb color
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
  
  // If it's a hex color (simple conversion)
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Fallback
  return `rgba(255, 255, 255, ${opacity})`;
};

export default function Particles({ count = 30, color = "rgb(255, 255, 255)" }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: `particle-${i}`,
      size: Math.random() * 10 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);

const animate = () => {
  setParticles(prevParticles =>
    prevParticles.map(p => {
      const nextX = p.x + p.speedX;
      const nextY = p.y + p.speedY;

      const speedX = nextX > 100 || nextX < 0 ? p.speedX * -0.9 : p.speedX;
      const speedY = nextY > 100 || nextY < 0 ? p.speedY * -0.9 : p.speedY;

      return {
        ...p,
        x: Math.max(0, Math.min(100, nextX)),
        y: Math.max(0, Math.min(100, nextY)),
        speedX,
        speedY,
      };
    })
  );
  animationRef.current = requestAnimationFrame(animate);
};


    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count]);

  return (
    <div 
      ref={containerRef}
      className="particles absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-colors duration-500"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: applyOpacity(
              Array.isArray(color) ? color[Math.floor(Math.random() * color.length)] : color,
              particle.opacity
            ),
            boxShadow: `0 0 ${particle.size/2}px ${particle.size/3}px ${
              applyOpacity(
                Array.isArray(color) ? color[Math.floor(Math.random() * color.length)] : color,
                particle.opacity * 0.5
              )
            }`,
          }}
        />
      ))}
    </div>
  );
}