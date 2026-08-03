import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gradient" | "secondary" | "ghost" | "outline" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]",
  gradient:
    "bg-gradient-primary text-white shadow-soft hover:brightness-110 hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-surface text-ink border border-border hover:border-strong hover:bg-surface-muted active:scale-[0.98]",
  ghost: "bg-transparent text-ink hover:bg-[rgb(var(--hover-subtle))] active:scale-[0.98]",
  outline:
    "bg-transparent border-2 border-primary-600 text-primary-700 hover:bg-primary-50 active:scale-[0.98]",
  danger: "bg-error text-white hover:bg-[rgb(var(--error-text))] active:scale-[0.98]",
  success: "bg-success text-white hover:bg-[rgb(var(--success-text))] active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-button gap-2",
  md: "h-11 px-5 text-button gap-2",
  lg: "h-[3.25rem] px-7 text-button gap-2.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;
type ButtonAsLink = CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps>;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", href, className, children, ...rest } = props;
  const classes = cn(
    "inline-flex select-none items-center justify-center rounded-md font-medium transition-[transform,background-color,box-shadow,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    const linkProps = rest as Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
