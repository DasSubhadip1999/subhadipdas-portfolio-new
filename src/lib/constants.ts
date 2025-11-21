export const NAV_LINKS = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/projects",
    label: "Projects",
  },
  {
    path: "/contact",
    label: "Contact",
  },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    url: "https://github.com/DasSubhadip1999",
    icon: "github",
  },
  {
    label: "Email",
    url: "mailto:subhadipdasrng54@gmail.com",
    icon: "mail",
  },
] as const;

export const PERSONAL_INFO = {
  name: "Subhadip Das",
  role: "Fullstack Developer",
  experience: 3,
  location: "West Bengal, India",
  email: "subhadipdasrng54@gmail.com",
  phone: "+91 8906499398",
  whatsapp:
    "https://api.whatsapp.com/send?phone=+918906499398&text=Hi Subhadip, I saw your portfolio, would like to connect with you further",
  github: "https://github.com/DasSubhadip1999",
} as const;
