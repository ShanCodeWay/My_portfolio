// src/hooks/useCategoryState.ts
import { useState, useEffect } from 'react';

type MainCategory = 'all' | 'software' | 'ai' | 'ui' | 'design' | 'video' | 'writing' | 'research';

export const useCategoryState = () => {
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [isInitialized, setIsInitialized] = useState(false);

  // Read from URL on initial load
  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') as MainCategory | null;
    
    console.log('[useCategoryState] Initial URL category:', category);
    
    if (category && ['software', 'ai', 'ui', 'design', 'video', 'writing', 'research'].includes(category)) {
      console.log('[useCategoryState] Setting initial category:', category);
      setActiveMainCategory(category);
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Update URL when category changes
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialized) return;
    
    const url = new URL(window.location.href);
    
    if (activeMainCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeMainCategory);
    }
    
    window.history.replaceState({}, '', url.toString());
    console.log('[useCategoryState] URL updated to:', url.toString());
  }, [activeMainCategory, isInitialized]);

  return {
    activeMainCategory,
    setActiveMainCategory,
    activeSubCategory,
    setActiveSubCategory,
    isInitialized
  };
};