import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-10 px-4 text-sm bg-transparent border border-border rounded-[var(--radius-md)]",
          "text-foreground placeholder:text-muted",
          "outline-none transition-colors duration-200",
          "focus:border-accent focus:ring-0",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
