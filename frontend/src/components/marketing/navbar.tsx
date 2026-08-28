"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-250 ease-out",
        scrolled || open
          ? "glass border-b border-border bg-surface/70 shadow-soft"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container-shell flex items-center justify-between transition-[height] duration-250 ease-out",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-nav font-medium transition-colors duration-200",
                    active ? "text-primary-700" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-600"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden text-nav font-medium text-ink-muted transition-colors hover:text-ink sm:inline-block"
          >
            Get a Quote
          </a>
          <a
            href="/pricing"
            className="hidden items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98] sm:inline-flex"
          >
            Get Started
            <ArrowRight size={16} aria-hidden />
          </a>
          <ThemeToggle className="hidden lg:flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-[rgb(var(--hover-subtle))] lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-surface lg:hidden"
          >
            <ul className="container-shell flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-3 text-body-md font-medium transition-colors",
                        active ? "bg-primary-50 text-primary-700" : "text-ink hover:bg-surface-muted"
                      )}
                    >
                      {link.label}
                      {active ? <span className="h-2 w-2 rounded-full bg-primary-600" /> : null}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            <div className="container-shell flex items-center gap-3 pb-6">
              <ThemeToggle className="lg:hidden" />
              <a
                href="/pricing"
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-button font-medium text-white shadow-soft"
              >
                Get Started
                <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
