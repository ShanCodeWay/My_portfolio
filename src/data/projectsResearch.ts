import { Project } from '@/types/project';

export const projectsResearch: Project[] = [
  {
    id: "final-year-research",
    title: "Final Year Research – AI for CVD & Diabetes",
    description:
      "Machine learning project with four modules: personalized music therapy, diet/exercise recommendations, stress detection, and integrated health risk prediction.",
    tags: ["Python", "TensorFlow", "Kaggle"],
    links: {
      demo: "https://drive.google.com/your-research-presentation",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "Final year research presentation on AI for CVD and Diabetes",
    },
    subCategory: "Academic Research",
    mainCategory: "Research",
  },
  {
    id: "internship-reports-case-studies",
    title: "Internship Reports & Case Studies",
    description:
      "Written reports on internship projects (MyiFi, LuckyWallet, SFin) and management case studies.",
    tags: ["Research", "Report Writing"],
    links: {},
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "Internship reports and case studies documentation",
      readTime: "5–10 min read",
    },
    subCategory: "Case Studies",
    mainCategory: "Research",
  },
];
