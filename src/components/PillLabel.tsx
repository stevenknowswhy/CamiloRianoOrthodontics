import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PillLabelProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export function PillLabel({
  children,
  variant = "light",
  className,
}: PillLabelProps) {
  return (
    <span
      className={cn(
        "inline-block px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest border",
        variant === "light"
          ? "border-border-light text-foreground"
          : "border-border-dark text-offwhite",
        className
      )}
    >
      {children}
    </span>
  );
}
