"use client";

import { PERSONAL_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { GithubIcon, Mail } from "lucide-react";

export function AnimatedContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Hi, I&apos;m {PERSONAL_INFO.name}
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        {PERSONAL_INFO.role} with {PERSONAL_INFO.experience} years of experience
        in the MERN stack. Passionate about building scalable web applications
        and staying current with industry trends.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild>
          <Link href="/projects">View My Work</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <GithubIcon className="h-6 w-6" />
        </Link>
        <Link
          href={`mailto:${PERSONAL_INFO.email}`}
          className="text-muted-foreground hover:text-foreground"
        >
          <Mail className="h-6 w-6" />
        </Link>
      </div>
    </motion.div>
  );
}
