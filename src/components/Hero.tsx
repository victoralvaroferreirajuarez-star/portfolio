"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CONTENT = {
  es: {
    greeting: "Hola, soy",
    role: "Futuro Desarrollador de Software",
    tagline: "Con ganas de progresar para salir adelante.",
    cta1: "Ver Proyectos",
    cta2: "Contactar",
    scroll: "Explorar",
  },
  en: {
    greeting: "Hi, I'm",
    role: "Aspiring Software Developer",
    tagline: "Eager to grow and make things happen.",
    cta1: "View Projects",
    cta2: "Contact",
    scroll: "Explore",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.6, 0, 0.05, 1] as [number, number, number, number] },
});

export default function Hero() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = CONTENT[lang];
  const dark = theme === "dark";

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        dark ? "bg-[#09090b]" : "bg-[#FAFAFA]"
      }`}
    >
      {/* Gradient blobs */}
      <motion.div
        className="absolute top-[-8%] right-[-4%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: dark
            ? "radial-gradient(circle at center, rgba(107,191,158,0.15), transparent 68%)"
            : "radial-gradient(circle at center, rgba(168,213,194,0.45), transparent 68%)",
        }}
        animate={{ x: [0, 25, 0], y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-6%] left-[-4%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: dark
            ? "radial-gradient(circle at center, rgba(91,168,212,0.12), transparent 68%)"
            : "radial-gradient(circle at center, rgba(168,200,232,0.38), transparent 68%)",
        }}
        animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute top-[42%] left-[28%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background: dark
            ? "radial-gradient(circle at center, rgba(107,191,158,0.08), transparent 68%)"
            : "radial-gradient(circle at center, rgba(184,224,208,0.2), transparent 68%)",
        }}
        animate={{ x: [0, 12, 0], y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          className={`text-xs font-semibold tracking-[0.2em] uppercase mb-5 ${
            dark ? "text-[#a1a1aa]" : "text-[#6E6E73]"
          }`}
          {...fadeUp(0.2)}
        >
          {t.greeting}
        </motion.p>

        <motion.h1
          className={`text-[clamp(3rem,10vw,6.5rem)] font-bold tracking-[-0.03em] leading-[1.02] mb-4 ${
            dark ? "text-white" : "text-[#1D1D1F]"
          }`}
          {...fadeUp(0.35)}
        >
          Alvaro Ferreira
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-light bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent mb-4 tracking-wide"
          {...fadeUp(0.5)}
        >
          avalito
        </motion.p>

        <motion.p
          className={`text-lg md:text-xl font-light mb-2 ${
            dark ? "text-[#a1a1aa]" : "text-[#6E6E73]"
          }`}
          {...fadeUp(0.6)}
        >
          {t.role}
        </motion.p>

        <motion.p
          className={`text-sm mb-10 max-w-sm mx-auto leading-relaxed ${
            dark ? "text-[#71717a]" : "text-[#6E6E73]"
          }`}
          {...fadeUp(0.7)}
        >
          {t.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
          {...fadeUp(0.82)}
        >
          <a
            href="#projects"
            className={`px-7 py-3 text-sm font-medium rounded-full active:scale-95 transition-all duration-300 hover:shadow-lg ${
              dark
                ? "bg-white text-[#09090b] hover:bg-white/90 hover:shadow-white/10"
                : "bg-[#1D1D1F] text-white hover:bg-[#3a3a3d] hover:shadow-black/10"
            }`}
          >
            {t.cta1}
          </a>
          <a
            href="#contact"
            className={`px-7 py-3 border text-sm font-medium rounded-full active:scale-95 transition-all duration-300 ${
              dark
                ? "border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]"
                : "border-black/15 text-[#1D1D1F] hover:border-black/30 hover:bg-black/[0.04]"
            }`}
          >
            {t.cta2}
          </a>
        </motion.div>

        {/* Social */}
        <motion.div className="flex gap-3 justify-center" {...fadeUp(0.95)}>
          {[
            { href: "https://github.com/victoralvaroferreirajuarez-star", Icon: GitHubIcon, label: "GitHub" },
            { href: "https://www.linkedin.com/in/victor-alvaro-ferreira-juarez-321970322/", Icon: LinkedInIcon, label: "LinkedIn" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 ${
                dark
                  ? "border-white/10 text-[#a1a1aa] hover:text-white hover:border-white/20 hover:bg-white/[0.04]"
                  : "border-black/10 text-[#6E6E73] hover:text-[#1D1D1F] hover:border-black/20 hover:bg-black/[0.04]"
              }`}
              aria-label={label}
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
          dark ? "text-[#52525b]" : "text-[#AEAEB2]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.18em] uppercase">{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  );
}
