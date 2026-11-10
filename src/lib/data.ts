// Single source of truth for site content, taken from the Oct 2026 resume.

export type Tone = "yellow" | "vermilion" | "teal" | "green" | "blue" | "pink" | "white" | "ink";

export const PERSONAL_INFO = {
  name: "Subhadip Das",
  nameBengali: "শুভদীপ দাস",
  role: "Senior Software Engineer",
  title: "Team Lead · Full Stack",
  location: "Raniganj, West Bengal",
  openTo: "Remote, Kolkata, Bengaluru, Pune, Hyderabad",
  email: "subhadipdasrng54@gmail.com",
  phone: "+91 8906499398",
  whatsapp:
    "https://api.whatsapp.com/send?phone=918906499398&text=Hi%20Subhadip%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
  github: "https://github.com/DasSubhadip1999",
  resume: "/Subhadip_Das_Resume.pdf",
  site: "https://subhadipdas-sigma.vercel.app",
} as const;

export const SUMMARY = [
  "I design, build and lead scalable web applications with React, Next.js, Node.js and TypeScript, and I've been doing it for 3.5+ years.",
  "Right now I'm Team Lead at Langoor, where I own the system architecture, user flows and backend design of a serverless AWS learning platform (Lambda, API Gateway, SQS, SES, RDS, Cognito, S3) with Strapi as a headless CMS and Mux for video.",
  "Before that I shipped internal platforms used by 10,000+ employees at Hindustan Unilever. I care about clean system design, sensible access control and teams that ship maintainable code on time.",
];

export const RATE_CARD = [
  { label: "Years in the trade", value: 3.5, decimals: 1, prefix: "", suffix: "+" },
  { label: "HUL employees served", value: 10000, decimals: 0, prefix: "", suffix: "+" },
  { label: "Content interaction lift", value: 40, decimals: 0, prefix: "~", suffix: "%" },
  { label: "Faster API responses", value: 30, decimals: 0, prefix: "20–", suffix: "%" },
];

export interface Job {
  id: string;
  company: string;
  client?: string;
  role: string;
  period: string;
  project?: string;
  tone: Tone;
  points: string[];
  tech: string[];
}

export const EXPERIENCE: Job[] = [
  {
    id: "langoor",
    company: "Langoor",
    role: "Senior Software Engineer (Team Lead)",
    period: "Jun 2026 – Present",
    project: "Grown Alchemist Studio, an internal learning platform for a personal care brand",
    tone: "teal",
    points: [
      "Lead the team building a learning platform where therapists and beauty advisors train through video courses and interactive documentation.",
      "Designed the end-to-end architecture on serverless AWS: Lambda, API Gateway, SQS, SES, RDS, Cognito and S3.",
      "Architected role-based access control with three admin roles (Super Admin, Market Manager, Partner Manager), multi-role users and multi-region management.",
      "Built gamified learning with quizzes to lift engagement and course completion.",
      "Defined user flows, module structure, API contracts and the coding standards the team follows.",
      "Integrated Strapi so content teams publish courses without developers, and Mux plus S3 for smooth video playback.",
      "Wired Cognito authentication, SQS for background jobs and SES for transactional email.",
      "Run task planning, code reviews and technical decisions so features ship on schedule.",
    ],
    tech: ["AWS Lambda", "API Gateway", "SQS", "SES", "Amazon RDS", "Cognito", "S3", "Strapi", "Mux", "Node.js", "React.js", "Next.js", "TypeScript"],
  },
  {
    id: "qloron",
    company: "Qloron Technology",
    client: "Hindustan Unilever",
    role: "Full Stack Developer",
    period: "May 2023 – May 2026",
    tone: "vermilion",
    points: [
      "Built an internal Pinterest-style platform from scratch, used by 10,000+ employees to discover and share automation solutions.",
      "Shipped pinning, sharing, comments and ratings, lifting internal content interaction by ~40%.",
      "Designed an admin dashboard with interactive analytics (pie charts, radar graphs), cutting manual reporting effort by ~30%.",
      "Contributed to a collaborative presentation app with real-time multi-user editing and dynamic graphs, cutting prep time by ~25%.",
      "Optimised APIs and data handling end to end, improving response times by ~20–30%.",
      "Smoothed the UI of internal tools, reducing friction and support requests from non-technical users.",
    ],
    tech: ["Next.js", "React.js", "Redux", "Tailwind CSS", "Node.js", "MySQL", "MongoDB", "Microsoft Azure", "OpenAI APIs", "SendGrid"],
  },
  {
    id: "ebo",
    company: "EBO Solutions",
    role: "Full Stack Developer Intern",
    period: "Jan 2023 – May 2023",
    tone: "green",
    points: [
      "Built the Ebonow website from the ground up, frontend and backend.",
      "Developed secure login and registration.",
      "Added a guest cart so visitors can save products without signing in.",
      "Created category filters and product detail pages for easier browsing.",
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Firebase", "AWS"],
  },
];

export interface Project {
  id: string;
  title: string;
  tagline: string;
  tone: Tone;
  badge: "Live" | "Under NDA" | "Personal";
  points: string[];
  tech: string[];
  image?: string;
  live?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "raniganjjobs",
    title: "RaniganjJobs",
    tagline: "A hyperlocal job platform connecting job seekers and employers in Raniganj.",
    tone: "yellow",
    badge: "Live",
    points: [
      "Built and launched solo: frontend, backend, database and deployment.",
      "Mobile-first job discovery and applications, plus employer posting and applicant management.",
      "REST APIs with optimised queries, Redis caching, Google login and validation.",
      "Runs on AWS EC2 behind Nginx, with Razorpay payments, SEO and analytics.",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redis", "Firebase Auth", "AWS EC2", "Nginx", "Razorpay", "Brevo", "Cloudinary"],
    live: "https://raniganjjobs.site",
  },
  {
    id: "grown-alchemist",
    title: "Grown Alchemist Studio",
    tagline: "A learning platform where therapists and beauty advisors train through video and interactive courses.",
    tone: "blue",
    badge: "Under NDA",
    points: [
      "Serverless AWS architecture I designed and lead as Team Lead at Langoor.",
      "Role-based access with three admin roles across markets and regions.",
      "Strapi headless CMS for content teams, Mux for video streaming.",
      "Gamified quizzes to drive course completion.",
    ],
    tech: ["AWS Lambda", "API Gateway", "SQS", "SES", "Cognito", "S3", "Strapi", "Mux", "TypeScript"],
  },
  {
    id: "automation-factory",
    title: "Automation Factory",
    tagline: "A Pinterest-style platform where 10,000+ Hindustan Unilever employees discover and share automation solutions.",
    tone: "vermilion",
    badge: "Under NDA",
    points: [
      "Built from scratch for Hindustan Unilever via Qloron Technology.",
      "Pinning, sharing, comments and ratings: ~40% more content interaction.",
      "Analytics dashboard for admins: ~30% less manual reporting.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "Microsoft Azure", "Elasticsearch", "Drupal"],
    image: "/projects/automation.png",
  },
  {
    id: "unmaze",
    title: "Unmaze Onetech",
    tagline: "A discovery platform for analysing market opportunities through data analytics and visualisation.",
    tone: "teal",
    badge: "Under NDA",
    points: [
      "Built for Hindustan Unilever via Qloron Technology.",
      "Azure SSO sign-in and deployment on Azure App Service.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Azure SSO", "Microsoft Azure"],
    image: "/projects/unmaze.png",
  },
  {
    id: "ebonow",
    title: "Ebonow",
    tagline: "Booking site for event, birthday and wedding decoration services.",
    tone: "green",
    badge: "Live",
    points: [
      "Built from the ground up during my internship at EBO Solutions.",
      "Secure auth, guest cart, category filters and product detail pages.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS", "Firebase", "Tailwind CSS"],
    image: "/projects/ebo.png",
    live: "https://www.ebonow.com/",
  },
  {
    id: "meesho",
    title: "Meesho Clone",
    tagline: "A full stack e-commerce clone with a catalogue of clothing and home products.",
    tone: "pink",
    badge: "Personal",
    points: ["Next.js storefront with an Express and MongoDB backend, deployed on Vercel."],
    tech: ["Next.js", "Express.js", "MongoDB", "Vercel", "SendGrid"],
    image: "/projects/meesho.png",
    live: "https://meesho-frontend.vercel.app",
    github: "https://github.com/DasSubhadip1999/meesho-frontend",
  },
];

export const SKILLS: { group: string; tone: Tone; items: string[] }[] = [
  { group: "Languages", tone: "yellow", items: ["JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"] },
  { group: "Frontend", tone: "vermilion", items: ["React.js", "Next.js", "Redux", "Tailwind CSS"] },
  { group: "Backend", tone: "teal", items: ["Node.js", "Express.js", "REST APIs", "Strapi", "Serverless", "Microservices"] },
  { group: "AWS", tone: "blue", items: ["AWS Lambda", "API Gateway", "SQS", "SES", "Amazon RDS", "Cognito", "S3", "AWS EC2"] },
  { group: "DevOps", tone: "green", items: ["Microsoft Azure", "Docker", "Kubernetes", "Nginx", "Vercel", "Git"] },
  { group: "Data", tone: "pink", items: ["MySQL", "MongoDB", "Redis", "Firebase"] },
  { group: "Integrations", tone: "yellow", items: ["Mux", "OpenAI APIs", "SendGrid", "Brevo", "Razorpay", "Cloudinary", "Firebase Auth"] },
  { group: "Strengths", tone: "ink", items: ["System Design", "RBAC", "Technical Leadership", "Code Reviews"] },
];

export const EDUCATION = [
  { what: "Bachelor of Computer Applications", where: "Chandigarh University", when: "Jul 2026 – Present" },
  { what: "Full Stack Web Development Program", where: "Digikull Institute", when: "Sep 2022 – Feb 2023" },
  { what: "B.Sc. Mathematics (Hons), two years", where: "T.D.B College", when: "2017 – 2019" },
];

export const CERTIFICATES = [
  { what: "Full Stack Web Development with React", where: "Udemy", url: "https://www.udemy.com/certificate/UC-c45b822f-20b5-4c32-894c-0e896cfa7e37/" },
  { what: "Microservices with Node.js and React", where: "Udemy", url: "https://www.udemy.com/certificate/UC-8635354d-2092-43fa-99f2-1d219ecd0cdb/" },
];

const norm = (s: string) => s.toLowerCase().replace(/\.js|[^a-z0-9]/g, "");

// Where a skill was used, matched by name against job and project tech lists.
export function usedAt(skill: string): string[] {
  const k = norm(skill);
  return [
    ...EXPERIENCE.filter((j) => j.tech.some((t) => norm(t) === k)).map((j) => j.company),
    ...PROJECTS.filter((p) => p.tech.some((t) => norm(t) === k)).map((p) => p.title),
  ];
}

export const SECTIONS = [
  { id: "shop", label: "Shopfront" },
  { id: "proprietor", label: "About" },
  { id: "workshops", label: "Experience" },
  { id: "stalls", label: "Projects" },
  { id: "stock", label: "Skills" },
  { id: "enquiry", label: "Contact" },
] as const;
