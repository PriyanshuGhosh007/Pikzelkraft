import { cn } from "@/lib/utils";

export function Avatar({
  name,
  imageUrl,
  size = "md",
  className,
}: {
  name?: string | null;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-caption",
    md: "h-10 w-10 text-button",
    lg: "h-16 w-16 text-h5",
  } as const;

  const initials = (name ?? "P")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizeClasses[size],
        imageUrl ? "" : "bg-gradient-primary text-white",
        className
      )}
      aria-label={name ?? "User avatar"}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
