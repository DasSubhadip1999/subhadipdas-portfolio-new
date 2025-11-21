"use client";

import { PERSONAL_INFO } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ContactContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Get in Touch
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Feel free to reach out to me through any of the following channels.
      </p>
      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Here&apos;s how you can reach me</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Link
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {PERSONAL_INFO.email}
              </Link>
            </div>
            <div className="flex items-center gap-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <Link
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {PERSONAL_INFO.phone}
              </Link>
            </div>
            <div className="flex items-center gap-x-3">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
              <Link
                href={PERSONAL_INFO.whatsapp}
                className="text-muted-foreground hover:text-foreground"
              >
                WhatsApp
              </Link>
            </div>
            <div className="flex items-center gap-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {PERSONAL_INFO.location}
              </span>
            </div>
            <div className="flex items-center gap-x-3">
              <Github className="h-5 w-5 text-muted-foreground" />
              <Link
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                GitHub Profile
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Message</CardTitle>
            <CardDescription>
              Send me a message and I&apos;ll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please email me at{" "}
              <Link
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-medium underline underline-offset-4"
              >
                {PERSONAL_INFO.email}
              </Link>{" "}
              to get in touch.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
