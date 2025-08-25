import React, { useEffect, useState } from 'react';
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
    subcategories: ['Video Editing','Graphic Design', 'Motion Graphics', '3D Modeling / Animation', '2D Animation']
  },
  video: { 
    name: 'Video Projects',
    subcategories: ['Promotional Videos', 'Screen Backgrounds', '2D Animations']
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
  showCategoryFilter = true
}: ProjectsSectionProps) {
        const { 
        activeMainCategory, 
        setActiveMainCategory, 
        activeSubCategory, 
        setActiveSubCategory 
        } = useCategory();





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

 


  // Combine all projects with proper category mapping
  const allProjects = [
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
  ];

 

const flyerProject = allProjects.find(p => p.id === 'social-media-flyers');


  // Filter projects by category
  const filteredProjects = allProjects.filter(project => {
    if (project.id === 'social-media-flyers') return false;
    if (activeMainCategory === 'all') return true;
    if (project.mainCategory !== activeMainCategory) return false;
    if (activeSubCategory === 'all') return true;
    return project.subCategory === activeSubCategory;
  });

  // Get subcategories for the active main category
  const activeSubCategories = activeMainCategory === 'all' 
    ? [] 
    : categoryStructure[activeMainCategory]?.subcategories || [];

  // Count projects for each main category
  const mainCategoryCounts = {
    all: allProjects.length,
    software: allProjects.filter(p => p.mainCategory === 'software').length,
    ai: allProjects.filter(p => p.mainCategory === 'ai').length,
    ui: allProjects.filter(p => p.mainCategory === 'ui').length,
    design: allProjects.filter(p => p.mainCategory === 'design').length,
    video: allProjects.filter(p => p.mainCategory === 'video').length,
    writing: allProjects.filter(p => p.mainCategory === 'writing').length,
    research: allProjects.filter(p => p.mainCategory === 'research').length
  };

  // Count projects for each subcategory
  const getSubCategoryCount = (subCat: string) => {
    return allProjects.filter(p => 
      p.mainCategory === activeMainCategory && p.subCategory === subCat
    ).length;
  };

  const handleMainCategoryChange = (category: MainCategory) => {
    setActiveMainCategory(category);
    setActiveSubCategory('all'); // Reset subcategory when main category changes
  };

  return (
    <section id="projects" className="projects-section">
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

        {/* Category Filter */}
        {showCategoryFilter && (
          <div className="category-filter">
            {/* Main Categories */}
            <div className="main-category-buttons">
              <button
                className={`main-category-button ${activeMainCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleMainCategoryChange('all')}
              >
                <span className="category-name">All Projects</span>
                <span className="category-count">{mainCategoryCounts.all}</span>
              </button>
              
              {Object.entries(categoryStructure).map(([key, category]) => (
                <button
                  key={key}
                  className={`main-category-button ${activeMainCategory === key ? 'active' : ''}`}
                  onClick={() => handleMainCategoryChange(key as MainCategory)}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{mainCategoryCounts[key as MainCategory]}</span>
                </button>
              ))}
            </div>

            {/* Subcategories (only show when a main category is selected) */}
            {activeMainCategory !== 'all' && activeSubCategories.length > 0 && (
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
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.mainCategory}-${project.subCategory}-${index}`}
              project={project}
              index={index}
            />
          ))}
         {flyerProject && (
            (activeMainCategory === 'all' && (activeSubCategory === 'all' || activeSubCategory === 'Graphic Design')) ||
            (activeMainCategory === 'design' && (activeSubCategory === 'all' || activeSubCategory === 'Graphic Design'))
          ) && (
            <SocialFlyer
              title={flyerProject.title}
              description={flyerProject.description}
              imageUrl={flyerProject.metadata?.alt || "/default-flyer.png"}
              tags={flyerProject.tags}
              ctaText="Go to page"
              ctaLink={flyerProject.links?.demo || flyerProject.links?.github || "#"}
              author={flyerProject.metadata?.author}
              date={flyerProject.metadata?.date}
            />
          )}






        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <h3>No projects found</h3>
            <p>There are no projects in this category yet.</p>
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