"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn("reveal", isInView && "revealed", className)}
    >
      {children}
    </div>
  );
}

export function SectionRevealLeft({
  children,
  className,
}: SectionRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn("reveal-left", isInView && "revealed", className)}
    >
      {children}
    </div>
  );
}

export function SectionRevealStagger({
  children,
  className,
}: SectionRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn("reveal-stagger", isInView && "revealed", className)}
    >
      {children}
    </div>
  );
}
