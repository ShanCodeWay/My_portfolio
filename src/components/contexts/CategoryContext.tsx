// src/contexts/CategoryContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Link from 'next/link';

type MainCategory = 'all' | 'software' | 'ai' | 'ui' | 'design' | 'video' | 'writing' | 'research';

interface CategoryContextType {
  activeMainCategory: MainCategory;
  setActiveMainCategory: (category: MainCategory) => void;
  activeSubCategory: string;
  setActiveSubCategory: (subCategory: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');

  return (
    <CategoryContext.Provider value={{
      activeMainCategory,
      setActiveMainCategory,
      activeSubCategory,
      setActiveSubCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};