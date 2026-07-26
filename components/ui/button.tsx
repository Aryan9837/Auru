import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 ease-[var(--ease)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" &&
            "bg-accent text-accent-on hover:opacity-90 active:opacity-80",
          variant === "secondary" &&
            "border border-border bg-transparent text-foreground hover:bg-surface-alt active:bg-surface-alt",
          variant === "ghost" &&
            "bg-transparent text-foreground hover:bg-surface-alt active:bg-surface-alt",
          variant === "danger" &&
            "bg-danger text-white hover:opacity-90 active:opacity-80",
          size === "sm" && "h-8 px-3 text-sm rounded-[var(--radius-sm)]",
          size === "md" && "h-10 px-5 text-sm rounded-[var(--radius-md)]",
          size === "lg" && "h-12 px-6 text-base rounded-[var(--radius-md)]",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
