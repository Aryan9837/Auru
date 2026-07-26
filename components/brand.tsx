export function Brand({ className, showLogo = true }: { className?: string; showLogo?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {showLogo && (
        <img
          src="/mascot.svg"
          alt=""
          className="h-6 w-6 sm:h-9 sm:w-9 object-contain"
          draggable={false}
        />
      )}
      <span className="font-serif text-xl sm:text-2xl tracking-tight">Auru</span>
    </span>
  );
}
