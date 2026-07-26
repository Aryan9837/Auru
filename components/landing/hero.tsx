"use client";

import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Particles } from "./particles";
import { GhostMascot } from "./ghost-mascot";

interface HeroProps {
  isSignedIn: boolean | undefined;
}

export function Hero({ isSignedIn }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(250, 204, 21, 0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <header className="landing-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10 sm:py-5">
        <Link href="/" className="text-[--landing-fg] no-underline">
          <Brand />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="award-chip hidden md:inline-flex">
            AI-powered characters
          </Link>
          {isSignedIn ? (
            <Link href="/explore">
              <Button size="sm" className="rounded-[var(--radius-pill)]">
                Open Auru
              </Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button
                size="sm"
                variant="ghost"
                className="text-[--landing-fg] rounded-[var(--radius-pill)]"
              >
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </header>

      <Particles />

      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-20 relative z-10">
        <div className="text-center max-w-5xl">
          <div className="hero-title flex justify-center mb-6">
            <GhostMascot className="w-28 sm:w-36" />
          </div>
          <h1 className="hero-title font-serif text-[clamp(3.5rem,14vw,11rem)] tracking-tight leading-[0.9] mb-8 select-none">
            AI conversations
            <br />
            <span className="italic text-[--landing-accent]">
              with character
            </span>
          </h1>
          <p className="hero-tagline text-lg sm:text-xl text-[--landing-muted] leading-relaxed max-w-xl mx-auto mb-10">
            Create unique AI personalities, explore a growing universe of souls,
            and have conversations that feel real.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  Create Your First Soul
                </Button>
              </SignInButton>
            )}
            <Link
              href="/explore"
              className="underline-yellow text-[--landing-fg]/70 hover:text-[--landing-fg] transition-colors text-sm"
            >
              Explore existing souls
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[--landing-muted] z-10">
        <span className="text-xs tracking-[0.2em] uppercase font-mono">
          Scroll
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[--landing-muted]"
        >
          <path
            d="M8 3v10M4 9l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
