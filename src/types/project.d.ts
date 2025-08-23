export interface Project {
  title: string;
  description: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
  mainCategory?: string; 
  subCategory?: string;  
}