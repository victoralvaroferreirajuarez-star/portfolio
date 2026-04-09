"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CONTENT = {
  es: { rights: "Todos los derechos reservados.", made: "Hecho con" },
  en: { rights: "All rights reserved.", made: "Made with" },
};

export default function Footer() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = CONTENT[lang];
  const year = new Date().getFullYear();
  const dark = theme === "dark";

  return (
    <footer className={`border-t py-8 transition-colors duration-300 ${dark ? "bg-[#09090b] border-white/[0.06]" : "bg-[#111111] border-white/[0.06]"}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className={`text-xs ${dark ? "text-[#52525b]" : "text-[#6E6E73]"}`}>
          © {year} Alvaro Ferreira. {t.rights}
        </p>
        <p className={`text-xs ${dark ? "text-[#52525b]" : "text-[#6E6E73]"}`}>
          {t.made}{" "}
          <span className="bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent font-medium">
            avalito
          </span>
        </p>
      </div>
    </footer>
  );
}
