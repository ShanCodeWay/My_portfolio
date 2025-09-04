import { Project } from '@/types/project';

export const projectsUI: Project[] = [
  {
    id: "eventify-ui",
    title: "Eventify (UI) – Figma Prototype",
    description:
      "High-fidelity Figma screens and interactive prototype; recorded walkthrough video.",
    tags: ["Figma", "UI/UX", "Prototyping"],
    links: {
      demo: "https://youtu.be/iYAsrs4WraE",
      prototype: "https://www.figma.com/proto/XzTyQQs21AtYmZdcGUeQGS/Eventify?node-id=186-4034&p=f&t=0dlPwCsPBinwK5eU-1&scaling=min-zoom&content-scaling=fixed&page-id=12%3A159",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-09-02",
      alt: "Eventify UI Figma prototype walkthrough",
    },
    subCategory: "UX/UI Design",
    mainCategory: "Design",
    image: "/images/projects/eventify_UI.png",
    priority: 6,
  },
  {
    id: "astronova",
    title: "Astronova Space Travel Booking App",
    description:
      "Prototype for Rootcode Tech-Triathlon competition using React, Node.js, MongoDB with Figma UI design.",
    tags: ["React", "Figma", "MongoDB", "Node.js"],
    links: {
      prototype: "https://www.figma.com/file/4qnXtyOwPRrU9swxu7GnLo/Power-Infinity",
      demo: "https://www.youtube.com/watch?v=9FRZvFTUOvY",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2023-07-04",
      alt: "Astronova space travel booking app prototype",
    },
     subCategory: "UX/UI Design",
    mainCategory: "Design",
    image: "/images/projects/astronova.png",
  },
  {
  id: "marisha-coco-prototype",
  title: "Marisha Coco Prototype | UI Design in Figma",
  description: "A modern UI design prototype for Marisha Coco created in Figma, showcasing intuitive interfaces and clean user flows. Completed on January 20, 2025.",
  tags: ["Figma", "UI Design", "Prototype", "UX Design", "App Design"],
  links: {
    demo: "https://youtu.be/csoXHfy88CQ", 
  },
  metadata: {
    author: "Darshana Wijebahu",
    date: "2025-01-20",
    alt: "Marisha Coco UI Prototype design in Figma",
  },
  subCategory: "UI/UX Design",
  mainCategory: "Design Projects",
  image: "/images/projects/MarishaCocoPrototype.png"
}

];
