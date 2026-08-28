export const siteConfig = {
  name: "Pikzelkraft",
  tagline: "Digital Excellence, Crafted.",
  description:
    "Pikzelkraft delivers pixel-perfect digital marketing and IT solutions for ambitious brands.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pikzelkraft.com",
  email: "hello@pikzelkraft.com",
  phone: "+91 85858 32972",
  whatsapp: "918585832972",
  address: "Flat no 1, Baikuntha Ganguly Rd, Amarabati, Sodepur, Kolkata, Khardaha, West Bengal 700110",
  hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
  social: {
    facebook: "https://facebook.com/pikzelkraft",
    instagram: "https://instagram.com/pikzelkraft",
    linkedin: "https://linkedin.com/company/pikzelkraft",
    twitter: "https://x.com/pikzelkraft",
    youtube: "https://youtube.com/@pikzelkraft",
  },
  mapEmbed:
    "https://www.google.com/maps?q=22.7030349,88.3871946&z=17&hl=en&output=embed",
  mapLink: "https://maps.app.goo.gl/e4W8EDrCUf242t3Y6",
  mapCoordinates: { lat: 22.7030349, lng: 88.3871946 },
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
