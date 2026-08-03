import {
  Brain,
  Clapperboard,
  Cloud,
  Code2,
  Figma,
  FileText,
  Mail,
  MousePointerClick,
  Palette,
  Search,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "web-development": Code2,
  "mobile-app-development": Smartphone,
  seo: Search,
  "social-media-marketing": Share2,
  "content-marketing": FileText,
  "email-marketing": Mail,
  "ppc-advertising": MousePointerClick,
  "branding-design": Palette,
  "ui-ux-design": Figma,
  "video-production": Clapperboard,
  "digital-strategy": TrendingUp,
  "ecommerce-development": ShoppingCart,
  "cloud-devops": Cloud,
  cybersecurity: ShieldCheck,
  "ai-automation": Brain,
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = serviceIcons[icon] ?? Code2;
  return <Icon className={className} aria-hidden />;
}
