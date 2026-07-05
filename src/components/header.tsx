"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Sun, Moon, Menu, X, Phone, UserCheck } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Notre flotte", href: "/flotte" },
    { label: "Services", href: "/services" },
    { label: "Nos agences", href: "/agences" },
    { label: "À propos", href: "/a-propos" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-between p-2 shadow-lg shadow-brand-orange/30 transform group-hover:scale-105 transition-transform duration-200">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-wider text-brand-blue dark:text-white">
              MOROCCO<span className="text-brand-orange">DRIVE</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-brand-orange relative py-1 ${
                    isActive
                      ? "text-brand-orange font-semibold"
                      : "text-brand-blue/80 dark:text-white/80"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-brand-blue dark:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-brand-orange" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-blue" />
                )}
              </button>
            )}

            {/* Admin visual shortcut */}
            <Link
              href="/admin"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-brand-blue dark:text-white transition-colors"
              title="Dashboard Admin"
            >
              <UserCheck className="w-5 h-5" />
            </Link>

            {/* Quick Contact & Reserve */}
            <a
              href="tel:+212522010203"
              className="flex items-center space-x-1.5 text-sm font-semibold text-brand-blue dark:text-white hover:text-brand-orange transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>+212 522 010 203</span>
            </a>

            <Link
              href="/flotte"
              className="bg-brand-orange hover:bg-brand-orange-light text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-md shadow-brand-orange/20 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Theme Toggle Mobile */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-brand-blue dark:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-brand-orange" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-blue" />
                )}
              </button>
            )}

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-brand-blue dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full glass shadow-lg border-t border-brand-blue/10 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-brand-orange text-white"
                        : "text-brand-blue/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-brand-orange"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-brand-blue/10 dark:border-white/10 flex flex-col space-y-3 px-3">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 text-base font-semibold text-brand-blue dark:text-white hover:text-brand-orange"
                >
                  <UserCheck className="w-5 h-5 text-brand-orange" />
                  <span>Dashboard Admin</span>
                </Link>

                <a
                  href="tel:+212522010203"
                  className="flex items-center space-x-2 text-base font-semibold text-brand-blue dark:text-white"
                >
                  <Phone className="w-5 h-5 text-brand-orange" />
                  <span>+212 522 010 203</span>
                </a>
                
                <Link
                  href="/flotte"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-brand-orange hover:bg-brand-orange-light text-white py-3 rounded-lg font-semibold shadow-md shadow-brand-orange/20"
                >
                  Réserver en ligne
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
