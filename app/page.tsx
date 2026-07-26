"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Marquee } from "@/components/landing/marquee";
import { Features } from "@/components/landing/features";
import { Showcase } from "@/components/landing/showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { Cta } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/explore");
    }
  }, [isSignedIn, router]);

  return (
    <div className="landing-page">
      <Hero isSignedIn={isSignedIn} />
      <About />
      <Marquee />
      <Features />
      <Showcase />
      <Testimonials />
      <Cta isSignedIn={isSignedIn} />
      <LandingFooter />
    </div>
  );
}
