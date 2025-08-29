export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
    prototype?: string;    // Figma prototype link
    article?: string;      // Medium article link
    documentation?: string; // PDF or other documentation
  };
  metadata?: {
    author?: string;
    date?: string;
    readTime?: string;
    alt?: string;          // For image alt text
  };
  subCategory?: string;
  mainCategory: string;
  image?: string;
  priority?: number;
}