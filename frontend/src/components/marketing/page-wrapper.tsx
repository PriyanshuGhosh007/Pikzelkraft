import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function PageWrapper({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-shell", className)} {...props} />;
}
