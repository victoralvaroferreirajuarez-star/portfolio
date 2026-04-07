"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const SKILLS = [
  { name: "HTML & CSS",        level: 45, gradient: "from-[#FF8C6B] to-[#FF6B6B]" },
  { name: "JavaScript",        level: 25, gradient: "from-[#F7DF1E] to-[#F0A500]" },
  { name: "Python",            level: 20, gradient: "from-[#5BA8D4] to-[#3572A5]" },
  { name: "Git & GitHub",      level: 35, gradient: "from-[#FF7043] to-[#F05032]" },
  { name: "React",             level: 15, gradient: "from-[#61DAFB] to-[#21B2C9]" },
  { name: "TypeScript",        level: 10, gradient: "from-[#5BA8D4] to-[#3178C6]" },
  { name: "Design Thinking",   level: 65, gradient: "from-[#A8D5C2] to-[#6BBF9E]" },
  { name: "Problem Solving",   level: 60, gradient: "from-[#A8C8E8] to-[#5BA8D4]" },
];

const CONTENT = {
  es: {
    label: "Habilidades",
    title: "Lo que estoy\naprendiendo.",
    subtitle:
      "Cada barra refleja mi nivel actual. El espacio que queda es el camino por delante — y eso me motiva.",
  },
  en: {
    label: "Skills",
    title: "What I'm\nlearning.",
    subtitle:
      "Each bar reflects my current level. The space left is the road ahead — and that's what drives me.",
  },
};

export default function Skills() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <section id="skills" className="py-32 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold text-[#5BA8D4] tracking-[0.18em] uppercase mb-3">
            {t.label}
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 whitespace-pre-line">
            {t.title}
          </h2>
          <p className="text-[#8E8E93] max-w-lg font-light leading-relaxed">{t.subtitle}</p>
        </motion.div>

        {/* Skill bars */}
        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="p-6 bg-white rounded-2xl hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.6, 0, 0.05, 1] }}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", transition: { duration: 0.25 } }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-[#1D1D1F]">{skill.name}</span>
                <span className="text-xs font-medium text-[#AEAEB2]">{skill.level}%</span>
              </div>
              <div className="h-[6px] bg-[#F5F5F7] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.25 + i * 0.07,
                    ease: [0.6, 0, 0.05, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
