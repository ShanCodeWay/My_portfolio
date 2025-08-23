// app/layout.tsx - Updated
'use client';

import React, { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/contexts/ThemeContext';
import { CategoryProvider } from '@/components/contexts/CategoryContext';
import Header from '@/components/components/Header';
import Footer from '@/components/components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>

      <html lang="en">
        <head>
          <title>Darshana Wijebahu | Full Stack Developer</title>
          <meta name="description" content="Portfolio showcasing projects in React Native, AI, and full-stack development" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
          <CategoryProvider> 
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16"> 
            {children}
          </main>
          <Footer />
        </body>
        </CategoryProvider>
      </html>
    </ThemeProvider>
  );
}