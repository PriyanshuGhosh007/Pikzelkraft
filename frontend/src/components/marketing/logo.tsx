import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  imageClassName,
}: {
  className?: string;
  href?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Pikzelkraft home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo.webp"
        alt="Pikzelkraft"
        width={3137}
        height={1699}
        priority
        className={cn("h-8 w-auto sm:h-9", imageClassName)}
      />
    </Link>
  );
}
