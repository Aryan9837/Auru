"use client";

export function GhostMascot({ className }: { className?: string }) {
  return (
    <div className={`ghost-container ${className ?? ""}`}>
      <img
        src="/mascot.svg"
        alt="Auru mascot"
        className="ghost-svg"
        draggable={false}
        width={200}
        height={200}
      />
    </div>
  );
}
