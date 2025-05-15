'use client';

import { PERSONAL_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
      <div className="mt-6 space-y-7 text-lg text-muted-foreground">
        <p>
          Hi, I&apos;m {PERSONAL_INFO.name}, a {PERSONAL_INFO.role} based in{" "}
          {PERSONAL_INFO.location}. I specialize in building modern web
          applications using the MERN stack (MongoDB, Express.js, React, and
          Node.js).
        </p>
        <p>
          With 2 years of experience in full-stack development, I&apos;ve worked
          on various projects ranging from internal tools to customer-facing
          applications. I&apos;m passionate about creating efficient, scalable,
          and user-friendly solutions.
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Skills & Technologies
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Frontend:</strong> HTML, CSS, JavaScript, React.js, Next.js,
            Tailwind CSS
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express.js
          </li>
          <li>
            <strong>Databases:</strong> MongoDB, MySQL, Redis
          </li>
          <li>
            <strong>Cloud Services:</strong> AWS, Azure
          </li>
          <li>
            <strong>DevOps:</strong> Docker, Kubernetes
          </li>
        </ul>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Education
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Digikull Fullstack Bootcamp (2022–2023)</li>
          <li>Raniganj High School (2014–2017)</li>
        </ul>
      </div>
    </motion.div>
  );
} 