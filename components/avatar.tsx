import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  avatarUrl: string | null | undefined;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  xs: "w-7 h-7 text-xs font-medium",
  sm: "w-8 h-8 text-xs font-medium",
  md: "w-12 h-12 text-lg font-serif",
  lg: "w-14 h-14 text-xl font-serif",
};

export function Avatar({ name, avatarUrl, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-surface-alt border border-border flex items-center justify-center shrink-0 overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        name[0]
      )}
    </div>
  );
}
