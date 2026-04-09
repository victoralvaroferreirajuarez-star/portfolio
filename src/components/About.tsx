"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Lightbulb, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CONTENT = {
  es: {
    label: "Sobre Mí",
    title: "Construyendo desde cero,\ncon visión de futuro.",
    paragraphs: [
      "Soy Alvaro Ferreira, conocido como avalito. En septiembre empezaré mis estudios en Computer Science, donde convertiré mi pasión por la tecnología en habilidades concretas.",
      "Me atrae la idea de crear productos digitales que combinen funcionalidad impecable con diseño elegante. Creo en el trabajo constante y en aprender haciendo.",
    ],
    cards: [
      {
        icon: GraduationCap,
        title: "CS Student · Sep 2025",
        desc: "Comenzando mi formación formal en informática.",
      },
      {
        icon: Code2,
        title: "Autodidacta",
        desc: "Aprendiendo desarrollo web por mi cuenta.",
      },
      {
        icon: Lightbulb,
        title: "Curioso por naturaleza",
        desc: "Siempre explorando nuevas tecnologías.",
      },
      {
        icon: Target,
        title: "Orientado al futuro",
        desc: "Con metas claras y ganas de crecer.",
      },
    ],
  },
  en: {
    label: "About Me",
    title: "Building from scratch,\nwith a vision for the future.",
    paragraphs: [
      "I'm Alvaro Ferreira, also known as avalito. In September I'll start studying Computer Science, where I'll turn my passion for technology into real skills.",
      "I'm drawn to creating digital products that combine flawless functionality with elegant design. I believe in consistent effort and learning by doing.",
    ],
    cards: [
      {
        icon: GraduationCap,
        title: "CS Student · Sep 2025",
        desc: "Starting my formal education in computer science.",
      },
      {
        icon: Code2,
        title: "Self-taught",
        desc: "Learning web development on my own.",
      },
      {
        icon: Lightbulb,
        title: "Naturally curious",
        desc: "Always exploring new technologies.",
      },
      {
        icon: Target,
        title: "Future-oriented",
        desc: "Clear goals and a drive to grow.",
      },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.6, 0, 0.05, 1] as [number, number, number, number] },
  }),
};

export default function About() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = CONTENT[lang];
  const dark = theme === "dark";

  return (
    <section id="about" className={`py-32 transition-colors duration-300 ${dark ? "bg-[#09090b]" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          custom={0}
          variants={fadeUp}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-3">
            {t.label}
          </p>
          <h2 className={`text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.1] tracking-tight whitespace-pre-line ${dark ? "text-white" : "text-[#1D1D1F]"}`}>
            {t.title}
          </h2>
        </motion.div>

        {/* Paragraphs */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {t.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={`text-lg leading-[1.75] font-light ${dark ? "text-[#a1a1aa]" : "text-[#6E6E73]"}`}
              initial="hidden"
              whileInView="visible"
              custom={0.1 + i * 0.12}
              variants={fadeUp}
              viewport={{ once: true, margin: "-60px" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              className={`p-6 rounded-2xl group cursor-default ${dark ? "bg-[#18181b]" : "bg-[#F5F5F7]"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8D5C2] to-[#A8C8E8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <card.icon size={18} className="text-white" strokeWidth={2} />
              </div>
              <h3 className={`text-sm font-semibold mb-1.5 leading-snug ${dark ? "text-white" : "text-[#1D1D1F]"}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-[#71717a]" : "text-[#8E8E93]"}`}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
