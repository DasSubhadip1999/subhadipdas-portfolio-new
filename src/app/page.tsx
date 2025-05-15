import { AnimatedContent } from "@/components/AnimatedContent";
import { MouseParallax } from "@/components/MouseParallax";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
      <MouseParallax />
      <AnimatedContent />
    </main>
  );
}
