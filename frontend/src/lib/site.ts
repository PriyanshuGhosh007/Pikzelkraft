export const siteConfig = {
  name: "Pikzelkraft",
  tagline: "Digital Excellence, Crafted.",
  description:
    "Pikzelkraft delivers pixel-perfect digital marketing and IT solutions for ambitious brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pikzelkraft.com",
  email: "hello@pikzelkraft.com",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Level 4, Pinnacle Tech Park, HSR Layout, Bengaluru, Karnataka 560102",
  hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
  social: {
    facebook: "https://facebook.com/pikzelkraft",
    instagram: "https://instagram.com/pikzelkraft",
    linkedin: "https://linkedin.com/company/pikzelkraft",
    twitter: "https://x.com/pikzelkraft",
    youtube: "https://youtube.com/@pikzelkraft",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.4!2d77.641!3d12.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzQzLjIiTiA3N8KwMzgnMjcuNiJF!5e0!3m2!1sen!2sin!4v1700000000000",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const companyStats = [
  { label: "Happy Clients", value: 120, suffix: "+" },
  { label: "Projects Delivered", value: 340, suffix: "+" },
  { label: "Years of Experience", value: 12, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
] as const;
