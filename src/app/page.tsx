import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Certifications } from "@/components/sections/Certifications";
import { CodingProfiles } from "@/components/sections/CodingProfiles";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SectionProgress } from "@/components/ui/SectionProgress";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden relative">
      <CustomCursor />
      <SectionProgress />

      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <CodingProfiles />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}
