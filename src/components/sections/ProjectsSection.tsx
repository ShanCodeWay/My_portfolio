import React, { useEffect, useState, useMemo } from 'react';
import ProjectCard from '../ui/ProjectCard';
import SectionTitle from '../ui/SectionTitle';

// Import all project data
import { projectsSoftware } from '@/data/projectsSoftware';
import { projectsAI } from '@/data/projectsAI';
import { projectsUI } from '@/data/projectsUI';
import { projectsDesign } from '@/data/projectsDesign';
import { projectsVideo } from '@/data/projectsVideo';
import { projectsWriting } from '@/data/projectsWriting';
import { projectsResearch } from '@/data/projectsResearch';
import { useCategoryState } from '@/hooks/useCategoryState';
import { useCategory } from '../contexts/CategoryContext';

import SocialFlyer from '../ui/SocialFlyerCard';

// Define category types
type MainCategory = 'all' | 'software' | 'ai' | 'ui' | 'design' | 'video' | 'writing' | 'research';
type SubCategory = string;

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  showCategoryFilter?: boolean;
  projectsPerPage?: number;
}

// Define the category structure based on your table
const categoryStructure = {
  software: {
    name: 'Software Development',
    subcategories: ['Mobile Apps', 'Web Apps', 'Desktop Apps', 'API & State Management']
  },
  ai: {
    name: 'AI & Research',
    subcategories: ['AI/ML Projects', 'Research']
  },
  ui: {
    name: 'UI/UX & Design',
    subcategories: ['UX/UI Design',  'Motion & Typography']
  },
  design: {
    name: 'Multimedia & Creative Work',
    subcategories: ['Graphic Design', 'Motion Graphics', '3D Modeling / Animation', '2D Animation']
  },
  video: { 
    name: 'Video Projects',
    subcategories: ['Video Editing','Promotional Videos', 'Screen Backgrounds', '2D Animations']
  },
  writing: {
    name: 'Writing & Documentation',
    subcategories: ['Articles', 'Social Media', 'Reports']
  },
  research: {
    name: 'Research',
    subcategories: ['Academic Research', 'Case Studies']
  }
};

export default function ProjectsSection({ 
  title = "Featured Projects", 
  subtitle = "A showcase of my recent work and creative solutions",
  showCategoryFilter = true,
  projectsPerPage = 9
}: ProjectsSectionProps) {
  const { 
    activeMainCategory, 
    setActiveMainCategory, 
    activeSubCategory, 
    setActiveSubCategory 
  } = useCategory();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
const [suggestions, setSuggestions] = useState<string[]>([]);
const [sortOption, setSortOption] = useState<'featured' | 'newest'>('featured');


  useEffect(() => {
    console.log('[ProjectsSection] activeMainCategory changed:', activeMainCategory);

    if (activeMainCategory !== 'all') {
      setTimeout(() => {
        const section = document.getElementById('projects');
        if (section) {
          console.log('[ProjectsSection] Scrolling to #projects');
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, [activeMainCategory]); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      console.log('[ProjectsSection] Setting active category from URL:', category);
      setActiveMainCategory(category as MainCategory);
      setActiveSubCategory('all');
    }
  }, []); // run only once

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeMainCategory, activeSubCategory, searchQuery]);

  
  // Combine all projects with proper category mapping
  const allProjects = useMemo(() => [
    ...projectsSoftware.map(p => ({ 
      ...p, 
      mainCategory: 'software' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsAI.map(p => ({ 
      ...p, 
      mainCategory: 'ai' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsUI.map(p => ({ 
      ...p, 
      mainCategory: 'ui' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsDesign.map(p => ({ 
      ...p, 
      mainCategory: 'design' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsVideo.map(p => ({ 
      ...p, 
      mainCategory: 'video' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsWriting.map(p => ({ 
      ...p, 
      mainCategory: 'writing' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    })),
    ...projectsResearch.map(p => ({ 
      ...p, 
      mainCategory: 'research' as MainCategory,
      subCategory: p.subCategory || 'Uncategorized'
    }))
  ], []);

  const flyerProject = allProjects.find(p => p.id === 'social-media-flyers');


  useEffect(() => {
  if (searchQuery.length > 1) {
    const uniqueTitles = Array.from(
      new Set(
        allProjects
          .filter(project => 
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(project => project.title)
      )
    );
    setSuggestions(uniqueTitles.slice(0, 5));
    setShowSuggestions(true);
  } else {
    setSuggestions([]);
    setShowSuggestions(false);
  }
}, [searchQuery, allProjects]);

  // Filter projects by category and search query
const filteredProjects = useMemo(() => {
  // 1) basic filtering
  let results = allProjects.filter(project => {
    // search
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // main category
    if (activeMainCategory !== 'all' && project.mainCategory !== activeMainCategory) {
      return false;
    }

    // subcategory
    if (activeSubCategory !== 'all' && project.subCategory !== activeSubCategory) {
      return false;
    }

    return true;
  });

  // helpers for safe comparisons
  const safeDate = (p: typeof allProjects[number]) => Date.parse(p?.metadata?.date ?? '') || 0;
  const safePriority = (p: typeof allProjects[number]) =>
    (typeof p.priority === 'number' ? p.priority : Infinity);

  // 2) sorting
  if (sortOption === 'newest') {
    // newest first, then lower priority (higher importance) as secondary
    results = [...results].sort((a, b) => {
      const dateA = safeDate(a);
      const dateB = safeDate(b);
      if (dateB !== dateA) return dateB - dateA;
      return safePriority(a) - safePriority(b);
    });
  } else {
    // featured (priority) first: lower number = higher priority
    // tie-breaker: newest first
    results = [...results].sort((a, b) => {
      const prA = safePriority(a);
      const prB = safePriority(b);
      if (prA !== prB) return prA - prB;
      const dateA = safeDate(a);
      const dateB = safeDate(b);
      return dateB - dateA;
    });
  }

  return results;
}, [allProjects, activeMainCategory, activeSubCategory, searchQuery, sortOption]);



  // Calculate pagination
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  
  // Get projects for current page
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Get subcategories for the active main category
  const activeSubCategories = activeMainCategory === 'all' 
    ? [] 
    : categoryStructure[activeMainCategory]?.subcategories || [];

  // Count projects for each main category
  const mainCategoryCounts = useMemo(() => ({
    all: allProjects.length,
    software: allProjects.filter(p => p.mainCategory === 'software').length,
    ai: allProjects.filter(p => p.mainCategory === 'ai').length,
    ui: allProjects.filter(p => p.mainCategory === 'ui').length,
    design: allProjects.filter(p => p.mainCategory === 'design').length,
    video: allProjects.filter(p => p.mainCategory === 'video').length,
    writing: allProjects.filter(p => p.mainCategory === 'writing').length,
    research: allProjects.filter(p => p.mainCategory === 'research').length
  }), [allProjects]);

  // Count projects for each subcategory
  const getSubCategoryCount = (subCat: string) => {
    return allProjects.filter(p => 
      p.mainCategory === activeMainCategory && p.subCategory === subCat
    ).length;
  };

const handleMainCategoryChange = (category: MainCategory) => {
  setActiveMainCategory(category);
  setActiveSubCategory('all'); 
  setSearchQuery('');          
  setCurrentPage(1);           
  setIsSearchActive(false);
};


const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const query = e.target.value;
  setSearchQuery(query);
  setIsSearchActive(query.length > 0);
  
  // If search is active, set category to 'all' to show results from all categories
  if (query.length > 0 && activeMainCategory !== 'all') {
    setActiveMainCategory('all');
    setActiveSubCategory('all');
  }
};

const handleSuggestionClick = (suggestion: string) => {
  setSearchQuery(suggestion);
  setIsSearchActive(true);
  setShowSuggestions(false);
  setActiveMainCategory('all');
  setActiveSubCategory('all');
};


const handleInputBlur = () => {
  setTimeout(() => {
    setShowSuggestions(false);
  }, 200);
};


const handleInputFocus = () => {
  if (searchQuery.length > 1 && suggestions.length > 0) {
    setShowSuggestions(true);
  }
};

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &laquo;
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-button ${1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className={`pagination-button ${totalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &raquo;
      </button>
    );

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          Showing {startIndex + 1}-{Math.min(endIndex, totalProjects)} of {totalProjects} projects
          {searchQuery && ` for "${searchQuery}"`}
        </div>
        <div className="pagination-controls">
          {pages}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="projects-section scroll-animate">
      <div className="projects-background">
        <div className="background-glow primary-glow"></div>
        <div className="background-glow secondary-glow"></div>
        <div className="background-glow accent-glow"></div>
      </div>
      
      <div className="projects-container">
        <SectionTitle
          title={title}
          subtitle={subtitle}
        />
 <div className="search-and-filters"> 
        {/* Search Bar */}
        <div className="search-container">
  <div className="search-input-wrapper">
    <input
      type="text"
      placeholder="Search projects by title..."
      value={searchQuery}
      onChange={handleSearchChange}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      className="search-input"
    />
    {searchQuery && (
      <button
        onClick={clearSearch}
        className="search-clear-button"
        aria-label="Clear search"
      >
        ×
      </button>
    )}
    {showSuggestions && suggestions.length > 0 && (
      <div className="search-suggestions">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="search-suggestion"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

                <div className="sort-controls">
                <label htmlFor="sort">Sort by: </label>
               <button
              className="sort-toggle-button"
              onClick={() =>
                setSortOption(sortOption === 'featured' ? 'newest' : 'featured')
              }
            >
              {sortOption === 'featured' ? 'Featured Priority' : 'Newest First'}
            </button>

              </div>
</div>

        {/* Category Filter */}
        {showCategoryFilter && (
          <div className="category-filter">
            {/* Main Categories */}
            <div className="main-category-buttons">
              <button
                className={`main-category-button ${activeMainCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleMainCategoryChange('all')}
                disabled={isSearchActive}
              >
                <span className="category-name">All Projects</span>
                <span className="category-count">{mainCategoryCounts.all}</span>
              </button>
              
              {Object.entries(categoryStructure).map(([key, category]) => (
                <button
                  key={key}
                  className={`main-category-button ${activeMainCategory === key ? 'active' : ''}`}
                  onClick={() => handleMainCategoryChange(key as MainCategory)}
                  disabled={isSearchActive}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{mainCategoryCounts[key as MainCategory]}</span>
                </button>
              ))}
            </div>

            {/* Subcategories (only show when a main category is selected and search is not active) */}
            {activeMainCategory !== 'all' && activeSubCategories.length > 0 && !isSearchActive && (
              <div className="subcategory-filter">
                <div className="subcategory-buttons">
                  <button
                    className={`subcategory-button ${activeSubCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveSubCategory('all')}
                  >
                    <span className="subcategory-name">All {categoryStructure[activeMainCategory].name}</span>
                    <span className="subcategory-count">
                      {mainCategoryCounts[activeMainCategory]}
                    </span>
                  </button>
                  
                  {activeSubCategories.map((subCat) => (
                    <button
                      key={subCat}
                      className={`subcategory-button ${activeSubCategory === subCat ? 'active' : ''}`}
                      onClick={() => setActiveSubCategory(subCat)}
                    >
                      <span className="subcategory-name">{subCat}</span>
                      <span className="subcategory-count">{getSubCategoryCount(subCat)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid">
          {currentProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.mainCategory}-${project.subCategory}-${index}-${project.id}`}
              project={project}
              index={index}
            />
          ))}
          
          {/* Social Flyer - only show when not searching and in appropriate categories */}
          {/* {flyerProject && !isSearchActive && (
            (activeMainCategory === 'all' && (activeSubCategory === 'all' || activeSubCategory === 'Graphic Design')) ||
            (activeMainCategory === 'design' && (activeSubCategory === 'all' || activeSubCategory === 'Graphic Design'))
          ) && (
            <SocialFlyer
              title={flyerProject.title}
              description={flyerProject.description}
              imageUrl={flyerProject.metadata?.alt || "/default-flyer.webp"}
              tags={flyerProject.tags}
              ctaText="Go to page"
              ctaLink={flyerProject.links?.demo || flyerProject.links?.github || "#"}
              author={flyerProject.metadata?.author}
              date={flyerProject.metadata?.date}
            />
          )} */}
        </div>

        {/* Pagination */}
        {renderPagination()}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>
              {searchQuery 
                ? `No projects found for "${searchQuery}". Try a different search term.`
                : 'There are no projects in this category yet.'
              }
            </p>
          </div>
        )}
        
        <div className="projects-cta">
          <p className="cta-text">Want to see more of my work?</p>
          <a 
            href="https://github.com/yourusername" 
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All Projects
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}