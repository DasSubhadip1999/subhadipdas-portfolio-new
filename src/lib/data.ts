export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  deployed?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "EBO",
    description:
      "EBO is a service provider for decorating events, birthdays, weddings, etc.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "AWS",
      "Firebase",
      "Tailwind CSS",
      "TypeScript",
    ],
    image: "/projects/ebo.png",
    deployed: "https://www.ebonow.com/",
  },
  {
    id: "2",
    title: "Automation Factory",
    description:
      "An enterprise-grade automation platform that streamlines business processes through intelligent workflow automation and integration capabilities.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    image: "/projects/automation.png",
    deployed: "NDA",
  },
  {
    id: "3",
    title: "Unmaze Onetech",
    description:
      "A powerful discovery platform that helps businesses identify and analyze market opportunities through advanced data analytics and visualization.",
    technologies: ["Next.js", "Python", "TensorFlow", "Redis", "Azure"],
    image: "/projects/unmaze.png",
    deployed: "NDA",
  },
  {
    id: "4",
    title: "Meesho Clone",
    description:
      "A powerful discovery platform that helps businesses identify and analyze market opportunities through advanced data analytics and visualization.",
    technologies: ["Next.js", "Python", "TensorFlow", "Redis", "Azure"],
    image: "/projects/meesho.png",
    deployed: "meesho-frontend.vercel.app",
  },
];
