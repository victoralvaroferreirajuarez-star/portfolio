"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CONTENT = {
  es: {
    label: "Proyectos",
    title: "Trabajo en\nconstrucción.",
    subtitle:
      "Estoy comenzando. Estos son los proyectos que tengo en marcha y los que tengo en mente.",
    statusLive: "En desarrollo",
    statusSoon: "Próximamente",
    projects: [
      {
        title: "Portfolio Personal",
        desc: "Este mismo sitio — diseñado y construido desde cero con Next.js, Tailwind CSS y Framer Motion.",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        status: "live",
        href: "#hero",
      },
      {
        title: "BananitaStore",
        desc: "Marketplace de mascotas de Adopt Me (Roblox). Compra, vende y calcula el valor de tus pets con una interfaz moderna.",
        tags: ["JavaScript", "Vite", "Supabase"],
        status: "live",
        href: "https://www.bananitastore.shop",
      },
      {
        title: "Proyecto #2",
        desc: "Algo relacionado con automatización y productividad. En fase de diseño.",
        tags: ["Python", "API", "Automatización"],
        status: "soon",
        href: null,
      },
    ],
  },
  en: {
    label: "Projects",
    title: "Work in\nprogress.",
    subtitle:
      "I'm just getting started. Here are the projects I'm building and have in mind.",
    statusLive: "In progress",
    statusSoon: "Coming soon",
    projects: [
      {
        title: "Personal Portfolio",
        desc: "This very site — designed and built from scratch with Next.js, Tailwind CSS and Framer Motion.",
        tags: ["Next.js", "TypeScript", "Tailwind"],
        status: "live",
        href: "#hero",
      },
      {
        title: "BananitaStore",
        desc: "Adopt Me (Roblox) pet marketplace. Buy, sell and calculate your pets' value with a modern interface.",
        tags: ["JavaScript", "Vite", "Supabase"],
        status: "live",
        href: "https://www.bananitastore.shop",
      },
      {
        title: "Project #2",
        desc: "Something related to automation and productivity. Currently in design phase.",
        tags: ["Python", "API", "Automation"],
        status: "soon",
        href: null,
      },
    ],
  },
};

export default function Projects() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = CONTENT[lang];
  const dark = theme === "dark";

  return (
    <section id="projects" className={`py-32 transition-colors duration-300 ${dark ? "bg-[#09090b]" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-3">
            {t.label}
          </p>
          <h2 className={`text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-tight mb-4 whitespace-pre-line ${dark ? "text-white" : "text-[#1D1D1F]"}`}>
            {t.title}
          </h2>
          <p className={`max-w-lg font-light leading-relaxed ${dark ? "text-[#71717a]" : "text-[#8E8E93]"}`}>{t.subtitle}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.projects.map((project, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col p-7 rounded-3xl border transition-all duration-300 group ${
                project.status === "live"
                  ? dark
                    ? "border-white/10 bg-[#18181b] hover:border-[#6BBF9E]/40 hover:shadow-xl hover:shadow-black/20"
                    : "border-black/10 bg-[#FAFAFA] hover:border-[#A8D5C2]/70 hover:shadow-xl hover:shadow-black/5"
                  : dark
                    ? "border-white/[0.06] bg-[#131316]"
                    : "border-black/[0.06] bg-[#F9F9F9]"
              }`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    project.status === "live"
                      ? dark
                        ? "bg-[#6BBF9E]/15 text-[#6BBF9E]"
                        : "bg-[#A8D5C2]/25 text-[#3D9B6E]"
                      : dark
                        ? "bg-white/[0.06] text-[#52525b]"
                        : "bg-black/[0.05] text-[#AEAEB2]"
                  }`}
                >
                  {project.status === "live" ? (
                    <>
                      <Sparkles size={9} />
                      {t.statusLive}
                    </>
                  ) : (
                    <>
                      <Clock size={9} />
                      {t.statusSoon}
                    </>
                  )}
                </span>

                {project.href && (
                  <a
                    href={project.href}
                    className={`p-2 rounded-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95 ${
                      dark ? "bg-white text-[#09090b]" : "bg-[#1D1D1F] text-white"
                    }`}
                    aria-label="Ver proyecto"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <h3 className={`text-base font-bold mb-2.5 ${dark ? "text-white" : "text-[#1D1D1F]"}`}>{project.title}</h3>
              <p className={`text-sm leading-relaxed font-light flex-1 mb-5 ${dark ? "text-[#71717a]" : "text-[#8E8E93]"}`}>
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] px-2.5 py-1 rounded-full border ${
                      dark
                        ? "text-[#52525b] bg-[#27272a] border-white/[0.06]"
                        : "text-[#AEAEB2] bg-white border-black/[0.07]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
