"use client";

import { useAuth } from "@clerk/nextjs";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Marquee } from "@/components/landing/marquee";
import { Features } from "@/components/landing/features";
import { Showcase } from "@/components/landing/showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { Cta } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/explore");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return null;
  }

  return (
    <div className="landing-page">
      <Hero isSignedIn={false} />
      <About />
      <Marquee />
      <Features />
      <Showcase />
      <Testimonials />
      <Cta isSignedIn={false} />
      <LandingFooter />
    </div>
  );
}