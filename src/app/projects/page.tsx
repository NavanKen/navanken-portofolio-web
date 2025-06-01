"use client";

import ProjectsGrid from "@/components/projects-grid";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { ThreeSpaceBackground } from "@/components/ui/three-space-background";
import { Navbar } from "@/components/ui/navbar";
import { FooterSection } from "@/components/sections/footer-section";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useState } from "react";

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      <div className="fixed inset-0 z-[-1]">
        <ThreeSpaceBackground showBlackHole={false} />
      </div>

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <Navbar />

        <main className="flex-1 relative z-10 min-h-screen pt-24">
          <Container>
            <div className="py-20">
              <PageHeader
                heading="All Projects"
                subheading="Explore all of my works and projects"
              />
              <div className="mt-16">
                <ProjectsGrid showAll={true} />
              </div>
            </div>
          </Container>
        </main>

        <FooterSection />
      </div>
    </>
  );
}
