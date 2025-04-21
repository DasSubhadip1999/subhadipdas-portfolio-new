export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Product Discovery Platform",
    description: "Built an internal product discovery platform for Hindustan Unilever, enabling efficient product search and management.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    image: "/projects/discovery-platform.png",
  },
  {
    id: "2",
    title: "Pinterest-like Automation Platform",
    description: "Created an automation product website similar to Pinterest, featuring dynamic content management and user interactions.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"],
    image: "/projects/automation-platform.png",
  },
  {
    id: "3",
    title: "EBO Web Platform",
    description: "Contributed to core feature development for web platforms during internship at EBO Solutions.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    image: "/projects/ebo-platform.png",
  },
] as const; 