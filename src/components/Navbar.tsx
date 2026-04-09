"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const NAV = {
  es: {
    links: ["Inicio", "Sobre Mí", "Habilidades", "Proyectos", "Servicios", "Contacto"],
    hrefs: ["#hero", "#about", "#skills", "#projects", "#services", "#contact"],
  },
  en: {
    links: ["Home", "About", "Skills", "Projects", "Services", "Contact"],
    hrefs: ["#hero", "#about", "#skills", "#projects", "#services", "#contact"],
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { links, hrefs } = NAV[lang];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, 0, 0.05, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center"
        >
          <img src="/logo.png" alt="avalito" className="h-9 w-auto" />
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {links.map((link, i) => (
            <a
              key={i}
              href={hrefs[i]}
              className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200 font-medium"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-black/12 hover:border-black/25 text-[#6E6E73] hover:text-[#1D1D1F] transition-all duration-200 tracking-wide"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[1.5px] w-5 bg-[#1D1D1F] origin-center transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#1D1D1F] transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#1D1D1F] origin-center transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-t border-black/5"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#1D1D1F] py-0.5"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
