import { Project } from '@/types/project';

export const projectsAI: Project[] = [
  {
    id: "cardioai",
    title: "CardioAi – AI-Powered Music Therapy Platform",
    description:
      "Multimodal AI system with Python (Librosa, LightGBM), React Native (Bluetooth heart-rate streaming), and Flask backend. Developed LSTM/GRU model trained on DEAP dataset for emotion prediction.",
    tags: ["Python", "React Native", "Flask", "TensorFlow", "Redux"],
    links: {
      demo: "https://youtu.be/your-cardioai-demo",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "CardioAi demo preview",
    },
    subCategory: "AI/ML Projects",
    mainCategory: "AI & Machine Learning",
  },
  {
    id: "stress-detection",
    title: "Stress Detection Model",
    description:
      "Real-time stress detection model with personalized activity recommendations based on physiological signals.",
    tags: ["Python", "Keras"],
    links: {
      demo: "https://youtu.be/your-stress-demo",
    },
    metadata: {
      author: "Darshana Wijebahu",
      date: "2024-10-04",
      alt: "Stress detection system demo",
    },
    subCategory: "AI/ML Projects",
    mainCategory: "AI & Machine Learning",
  },
];
