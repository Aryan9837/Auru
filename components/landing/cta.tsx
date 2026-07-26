"use client";

import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "./section-reveal";
import { GhostMascot } from "./ghost-mascot";

interface CtaProps {
  isSignedIn: boolean | undefined;
}

export function Cta({ isSignedIn }: CtaProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(250, 204, 21, 0.06) 0%, transparent 60%)",
        }}
      />

      <SectionReveal>
        <div className="text-center max-w-3xl relative z-10">
          <div className="flex justify-center mb-8">
            <GhostMascot className="w-20 sm:w-24" />
          </div>
          <h2 className="font-serif text-4xl sm:text-7xl tracking-tight leading-none mb-8">
            Start your first
            <br />
            <span className="italic text-[--landing-accent]">
              conversation
            </span>
          </h2>
          <p className="text-lg text-[--landing-muted] mb-10 max-w-lg mx-auto">
            Create your first AI character or explore existing ones. The souls
            are waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isSignedIn ? (
              <Link href="/explore">
                <Button
                  size="lg"
                  className="rounded-[var(--radius-pill)] px-10 text-base"
                >
                  Open Auru
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="rounded-[var(--radius-pill)] px-10 text-base"
                >
                  Get Started &mdash; It&apos;s Free
                </Button>
              </SignInButton>
            )}
            <Link
              href="/explore"
              className="underline-yellow text-[--landing-fg]/60 hover:text-[--landing-fg] transition-colors text-sm"
            >
              See all souls
            </Link>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
