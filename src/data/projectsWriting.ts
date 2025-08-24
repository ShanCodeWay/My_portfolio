import { Project } from '@/types/project';

export const projectsWriting: Project[] = [
  {
    id: "firebase-react-native-article",
    title: "Medium Article – Firebase & React Native Tutorial",
    description:
      "Beginner-friendly article + video tutorial on building real-time apps with Firebase and React Native.",
    tags: ["Writing", "React Native", "Firebase"],
    links: {
      demo: "https://medium.com/@yourprofile/firebase-react-native-tutorial",
      article: "https://medium.com/@yourprofile/firebase-react-native-tutorial",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "Firebase & React Native tutorial article",
      readTime: "10 min read",
    },
    subCategory: "Articles",
    mainCategory: "Writing",
  },
  {
    id: "linkedin-captions",
    title: "Professional LinkedIn Captions",
    description: "Wrote professional captions for project showcases and event posts.",
    tags: ["Writing", "Content Creation"],
    links: {},
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "Professional LinkedIn captions for projects and events",
      readTime: "2 min read",
    },
    subCategory: "Social Media",
    mainCategory: "Writing",
  },
];
