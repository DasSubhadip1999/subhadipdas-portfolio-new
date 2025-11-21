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
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "Azure VM",
      "Elastic Search",
      "Drupal",
    ],
    image: "/projects/automation.png",
    deployed: "NDA",
  },
  {
    id: "3",
    title: "Unmaze Onetech",
    description:
      "A powerful discovery platform that helps businesses identify and analyze market opportunities through advanced data analytics and visualization.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Azure SSO",
      "Azure App Service",
    ],
    image: "/projects/unmaze.png",
    deployed: "NDA",
  },
  {
    id: "4",
    title: "Meesho Clone",
    description:
      "From trendy fashion finds to essential homeware, Meesho is your one-stop shop for everything you need. Explore millions of products across a wide variety of Clothes and Products",
    technologies: ["Next.js", "Express.js", "MongoDB", "Vercel", "SendGrid"],
    image: "/projects/meesho.png",
    deployed: "https://meesho-frontend.vercel.app",
    github: "https://github.com/DasSubhadip1999/meesho-frontend.git",
  },
];
