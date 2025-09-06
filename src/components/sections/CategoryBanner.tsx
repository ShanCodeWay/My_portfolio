import React, { useState, useEffect, useRef } from 'react';
import { useCategory } from '@/components/contexts/CategoryContext';
import { useTheme } from '../contexts/ThemeContext';
import Particles from '../ui/Particles';

interface BannerItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  accentColorLight: string;
  accentColorDark: string;
  icon: string;
  tagline: string;
  backgroundImage?: string;
}
type MainCategory = 'all' | 'software' | 'ai' | 'ui' | 'design' | 'video' | 'writing' | 'research';

const CategoryBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

  const { setActiveMainCategory, setActiveSubCategory } = useCategory();
  const { theme } = useTheme();
  
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
      
const bannerItems: BannerItem[] = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Innovative applications built with modern technologies',
    tagline: 'Transforming ideas into functional digital solutions',
    category: 'software',
    images: [
      'images/background/CategoryBannerImages/MobileBackground.webp',
      'images/background/CategoryBannerImages/WebBackground.webp',
      'images/background/CategoryBannerImages/DesktopBackground.webp'
    ],
    accentColorLight: '#4ADEDE',   // Soft Teal Cyan
    accentColorDark: '#00D1D1',    // Deep Electric Teal Glow
    icon: '💻',
    backgroundImage: 'images/background/CategoryBannerImages/softwarebackgroundImage.webp' 
  },
  {
    id: 'ai',
    title: 'AI & Research',
    description: 'Cutting-edge artificial intelligence projects',
    tagline: 'Pushing the boundaries of intelligent systems',
    category: 'ai',
    images: [
      'images/background/CategoryBannerImages/cardioAi.webp',
      'images/background/CategoryBannerImages/phishguard.webp',
      'images/background/CategoryBannerImages/spotifyAi.webp'
    ],
    accentColorLight: '#7D7DFF',   // Soft Neon Purple
    accentColorDark: '#5A5AFF',    // Deep Glow Indigo
    icon: '🤖',
    backgroundImage: 'images/background/CategoryBannerImages/AiBackgroundImage.webp'
  },
  {
    id: 'ui',
    title: 'UI/UX & Design',
    description: 'Beautiful interfaces and exceptional user experiences',
    tagline: 'Creating experiences that users love',
    category: 'ui',
    images: [
      'images/background/CategoryBannerImages/UiUxBackgroundImage.webp',
      'images/background/CategoryBannerImages/eventify_UI.webp',
      'images/background/CategoryBannerImages/MarishaCocoPrototype.webp'
    ],
    accentColorLight: '#FFB84D',   // Warm Gold-Orange
    accentColorDark: '#FF8C00',    // Rich Amber Glow
    icon: '🎨',
    backgroundImage: 'images/background/CategoryBannerImages/UiUxBackgroundImage.webp'
  },
  {
    id: 'video',
    title: 'Video Projects',
    description: 'Creative motion graphics and visual storytelling',
    tagline: 'Bringing stories to life through motion',
    category: 'video',
    images: [
      'images/background/CategoryBannerImages/Davincy.webp',
      'images/background/CategoryBannerImages/Helicopter-3D-Model.webp',
      'images/background/CategoryBannerImages/GameTrailer2024.webp'
    ],
    accentColorLight: '#FF6EC7',   // Vibrant Pink
    accentColorDark: '#FF1493',    // Deep Neon Pink Glow
    icon: '🎥',
    backgroundImage: 'images/background/CategoryBannerImages/videoBackgroundImage.webp' 
  },
  {
    id: 'writing',
    title: 'Writing & Content',
    description: 'Engaging articles and content strategies',
    tagline: 'Words that connect and inspire action',
    category: 'writing',
    images: [
      'images/background/CategoryBannerImages/react-native-app-security-biometric-authentication.webp', 
      'images/background/CategoryBannerImages/why-choose-react-over-flutter.webp',
      'images/background/CategoryBannerImages/expo-vs-react-native-cli.webp'
    ],
    accentColorLight: '#FFD700',  // Bright Gold
accentColorDark: '#FFA000',   // Deep Amber





    icon: '📝',
    backgroundImage: 'images/background/CategoryBannerImages/WriteBackgroundImage.webp'
  }
];






  // Get current accent color based on theme
  const getAccentColor = (item: BannerItem) => {
    return theme === 'dark' ? item.accentColorDark : item.accentColorLight;
  };

  // Clean up interval
  const clearBannerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-rotate banners with improved logic
  useEffect(() => {
    // Clear any existing interval
    clearBannerInterval();
    
    if (isPaused || isAnimating) return;

    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
      
      // Use requestAnimationFrame for smoother animation timing
      requestAnimationFrame(() => {
        setTimeout(() => setIsAnimating(false), 600);
      });
    }, 5000);

    return () => clearBannerInterval();
  }, [isPaused, isAnimating, bannerItems.length]);

  // Handle visibility on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else {
          setIsPaused(false);
        }
      },
      { threshold: 0.5 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  // Animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 600);
    });
  };

  const prevBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerItems.length) % bannerItems.length);
    
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 600);
    });
  };

  const goToBanner = (index: number) => {
    if (index === currentIndex || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    
    requestAnimationFrame(() => {
      setTimeout(() => setIsAnimating(false), 600);
    });
  };

  const handleCategoryClick = (category: string) => {
    console.log('[CategoryBanner] Handling click for category:', category);
    
    // Update URL first
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    window.history.replaceState({}, '', url.toString());
    
    // Then update state
    setActiveMainCategory(category as MainCategory);
    setActiveSubCategory('all');
    
    console.log('[CategoryBanner] Updated state to:', category);
    
    // Scroll to projects
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        console.log('[CategoryBanner] Scrolling to projects');
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  
  const currentItem = bannerItems[currentIndex];
  const accentColor = getAccentColor(currentItem);

  // Force swap on scroll / swipe
useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    if (isAnimating) return;
    if (e.deltaY > 0) {
      nextBanner();
    } else if (e.deltaY < 0) {
      prevBanner();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextBanner(); 
      else prevBanner();          
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const bannerEl = bannerRef.current;
  if (bannerEl) {
    bannerEl.addEventListener('wheel', handleWheel, { passive: true });
    bannerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    bannerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  return () => {
    if (bannerEl) {
      bannerEl.removeEventListener('wheel', handleWheel);
      bannerEl.removeEventListener('touchstart', handleTouchStart);
      bannerEl.removeEventListener('touchend', handleTouchEnd);
    }
  };
}, [isAnimating]);


  return (
    <section className="category-banner" ref={bannerRef}>
      <Particles count={60} color={particleColors} />
      
      {/* Background decorative elements */}
      <div className="banner-background-elements">
        <div className="floating-shape shape-1" style={{ backgroundColor: `${accentColor}15` }}></div>
        <div className="floating-shape shape-2" style={{ backgroundColor: `${accentColor}10` }}></div>
        <div className="floating-shape shape-3" style={{ backgroundColor: `${accentColor}08` }}></div>
      </div>
      
      <div 
        className="banner-container"
        onMouseEnter={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 300)}
      >
        
        <div className="banner-track" style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isAnimating ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
        }}>
            
          {bannerItems.map((item, index) => {
            const itemAccentColor = getAccentColor(item);
            
            return (
              <div
  key={item.id}
  className="banner-slide"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.2)), url(${item.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '1rem',
    overflow: 'hidden',
    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
    boxShadow: theme === 'dark'
      ? '0 20px 40px rgba(0, 0, 0, 0.3)'
      : '0 20px 40px rgba(0, 0, 0, 0.15)',
  }}
>
  <div className="banner-content">
                   
                  <div className="banner-text">
                    <div className="text-header">
                      <div className="category-icon" style={{ color: itemAccentColor }}>
                        {item.icon}
                      </div>
                      <div 
                        className="category-badge" 
                        style={{ 
                          backgroundColor: theme === 'dark' 
                            ? `${itemAccentColor}20` 
                            : `${itemAccentColor}15`,
                          color: itemAccentColor
                        }}
                      >
                        {item.category.toUpperCase()}
                      </div>
                    </div>
                    <h2 className="banner-title" style={{ color: itemAccentColor }}>
                      {item.title}
                    </h2>
                    <p className="banner-tagline">{item.tagline}</p>
                    <p className="banner-description">{item.description}</p>
                    <button
                      className="banner-cta"
                      onClick={() => handleCategoryClick(item.category as MainCategory)}
                      style={{ 
                        background: `linear-gradient(135deg, ${itemAccentColor} 0%, ${itemAccentColor}E6 100%)`,
                        boxShadow: theme === 'dark' 
                          ? `0 4px 14px 0 ${itemAccentColor}40` 
                          : `0 4px 14px 0 ${itemAccentColor}60`
                      }}
                    >
                      Explore Projects
                      <svg className="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="banner-visual">
                    <div className="compact-collage">
                      <div className="main-image-container">
                        <div 
                          className="collage-image main"
                          style={{ 
                            backgroundImage: `url(${item.images[0]})`,
                            boxShadow: theme === 'dark' 
                              ? `0 15px 30px ${itemAccentColor}20` 
                              : `0 15px 30px ${itemAccentColor}30`
                          }}
                        />
                        <div className="image-overlay" style={{ background: `linear-gradient(to top, ${itemAccentColor}20, transparent)` }}></div>
                      </div>
                      
                      <div className="side-images">
                        <div className="side-image-container">
                          <div 
                            className="collage-image side"
                            style={{ 
                              backgroundImage: `url(${item.images[1]})`,
                              boxShadow: theme === 'dark' 
                                ? `0 8px 20px ${itemAccentColor}15` 
                                : `0 8px 20px ${itemAccentColor}20`
                            }}
                          />
                          <div className="image-overlay" style={{ background: `linear-gradient(to top, ${itemAccentColor}15, transparent)` }}></div>
                        </div>
                        <div className="side-image-container">
                          <div 
                            className="collage-image side"
                            style={{ 
                              backgroundImage: `url(${item.images[2]})`,
                              boxShadow: theme === 'dark' 
                                ? `0 8px 20px ${itemAccentColor}15` 
                                : `0 8px 20px ${itemAccentColor}20`
                            }}
                          />
                          <div className="image-overlay" style={{ background: `linear-gradient(to top, ${itemAccentColor}15, transparent)` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <button 
          className="banner-nav banner-nav-prev" 
          onClick={prevBanner}
          style={{
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            color: theme === 'dark' ? '#fff' : accentColor,
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="banner-nav banner-nav-next" 
          onClick={nextBanner}
          style={{
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            color: theme === 'dark' ? '#fff' : accentColor,
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicator dots */}
        <div className="banner-indicators">
          {bannerItems.map((_, index) => {
            const itemAccentColor = getAccentColor(bannerItems[index]);
            
            return (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToBanner(index)}
                style={{ 
                  backgroundColor: index === currentIndex 
                    ? itemAccentColor 
                    : theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;