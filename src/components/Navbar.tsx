"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { links, hrefs } = NAV[lang];
  const dark = theme === "dark";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-sm py-3"
            : "bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, 0, 0.05, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5">
          <img
            src={dark ? "/logo-v4.png" : "/logo-v5.png"}
            alt="avalito"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-base font-semibold tracking-tight bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent">
            avalito
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {links.map((link, i) => (
            <a
              key={i}
              href={hrefs[i]}
              className={`text-sm font-medium transition-colors duration-200 ${
                dark
                  ? "text-[#a1a1aa] hover:text-white"
                  : "text-[#6E6E73] hover:text-[#1D1D1F]"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-200 ${
              dark
                ? "border-white/10 text-[#a1a1aa] hover:text-white hover:border-white/20"
                : "border-black/10 text-[#6E6E73] hover:text-[#1D1D1F] hover:border-black/20"
            }`}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 tracking-wide ${
              dark
                ? "border-white/10 text-[#a1a1aa] hover:text-white hover:border-white/20"
                : "border-black/12 text-[#6E6E73] hover:text-[#1D1D1F] hover:border-black/25"
            }`}
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
            {[0, 1, 2].map((j) => (
              <span
                key={j}
                className={`block h-[1.5px] w-5 origin-center transition-all duration-300 ${
                  dark ? "bg-white" : "bg-[#1D1D1F]"
                } ${
                  j === 0 && menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
                } ${
                  j === 1 && menuOpen ? "opacity-0 scale-x-0" : ""
                } ${
                  j === 2 && menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
                }`}
              />
            ))}
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
            className={`md:hidden overflow-hidden backdrop-blur-2xl border-t ${
              dark
                ? "bg-[#09090b]/95 border-white/5"
                : "bg-white/95 border-black/5"
            }`}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={hrefs[i]}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium py-0.5 ${
                    dark ? "text-white" : "text-[#1D1D1F]"
                  }`}
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
