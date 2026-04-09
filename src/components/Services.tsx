"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Workflow, Bot, Database, CheckCircle, Loader2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CONTENT = {
  es: {
    label: "Automatizaciones",
    title: "Servicios que ofrezco",
    subtitle: "Soluciones digitales para hacer crecer tu negocio con IA y automatización.",
    services: [
      {
        icon: MessageCircle,
        name: "WhatsApp Bot",
        description: "Chatbot para WhatsApp Business con respuestas automáticas 24/7, gestión de clientes y flujos personalizados.",
        price: "Desde $150",
        tag: "whatsapp",
        color: "from-[#25D366]/20 to-[#25D366]/5",
        accent: "#25D366",
        details: ["Respuestas automáticas 24/7", "Menús interactivos y botones", "Integración con tu catálogo", "Gestión de pedidos y reservas", "Notificaciones automáticas"],
      },
      {
        icon: Workflow,
        name: "Flujos Automatizados",
        description: "Conecta tus apps, emails y CRM con n8n o Make. Elimina tareas repetitivas y ahorra horas de trabajo al día.",
        price: "Desde $100",
        tag: "workflows",
        color: "from-[#A8D5C2]/30 to-[#A8D5C2]/5",
        accent: "#6BBF9E",
        details: ["Conexión entre apps (Gmail, Sheets, Notion…)", "Automatización de emails", "Sincronización de datos", "Alertas y notificaciones", "Flujos personalizados"],
      },
      {
        icon: Bot,
        name: "Chatbot con IA",
        description: "Asistente virtual inteligente con GPT o Claude para atención al cliente, soporte técnico o ventas.",
        price: "Desde $200",
        tag: "chatbot",
        color: "from-[#A8C8E8]/30 to-[#A8C8E8]/5",
        accent: "#5BA8D4",
        details: ["IA entrenada con tu información", "Respuestas naturales y precisas", "Integración en web o app", "Soporte y ventas automáticas", "Mejora continua"],
      },
      {
        icon: Database,
        name: "Integración CRM",
        description: "Conecta tus herramientas de ventas, contactos y seguimiento. Un solo lugar para gestionar todo tu negocio.",
        price: "Desde $120",
        tag: "crm",
        color: "from-[#C8B8E8]/30 to-[#C8B8E8]/5",
        accent: "#9B8ED4",
        details: ["Centraliza contactos y clientes", "Seguimiento automático de ventas", "Conexión con email y calendario", "Reportes automáticos", "Pipeline de ventas"],
      },
    ],
    form: {
      title: "Solicitar un servicio",
      subtitle: "Cuéntame lo que necesitas y te respondo en menos de 24 horas.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      service: "Servicio",
      selectService: "Selecciona un servicio",
      description: "Descripción",
      descriptionPlaceholder: "Describe brevemente lo que necesitas para tu negocio...",
      send: "Enviar solicitud",
      sending: "Enviando...",
      success: "¡Solicitud enviada! Te contactaré en menos de 24 horas.",
      error: "Algo salió mal. Por favor inténtalo de nuevo.",
    },
    serviceOptions: [
      { value: "whatsapp", label: "WhatsApp Bot" },
      { value: "workflows", label: "Flujos Automatizados (n8n / Make)" },
      { value: "chatbot", label: "Chatbot con IA" },
      { value: "crm", label: "Integración CRM" },
    ],
  },
  en: {
    label: "Automations",
    title: "Services I offer",
    subtitle: "Digital solutions to grow your business with AI and automation.",
    services: [
      {
        icon: MessageCircle,
        name: "WhatsApp Bot",
        description: "WhatsApp Business chatbot with 24/7 automatic replies, customer management and custom conversation flows.",
        price: "From $150",
        tag: "whatsapp",
        color: "from-[#25D366]/20 to-[#25D366]/5",
        accent: "#25D366",
        details: ["24/7 automatic replies", "Interactive menus & buttons", "Catalog & product integration", "Order & booking management", "Automated notifications"],
      },
      {
        icon: Workflow,
        name: "Automated Workflows",
        description: "Connect your apps, emails and CRM with n8n or Make. Eliminate repetitive tasks and save hours of work every day.",
        price: "From $100",
        tag: "workflows",
        color: "from-[#A8D5C2]/30 to-[#A8D5C2]/5",
        accent: "#6BBF9E",
        details: ["App connections (Gmail, Sheets, Notion…)", "Email automation", "Data synchronization", "Alerts & notifications", "Custom workflow design"],
      },
      {
        icon: Bot,
        name: "AI Chatbot",
        description: "Smart virtual assistant powered by GPT or Claude for customer service, technical support or sales.",
        price: "From $200",
        tag: "chatbot",
        color: "from-[#A8C8E8]/30 to-[#A8C8E8]/5",
        accent: "#5BA8D4",
        details: ["Trained on your own data", "Natural, accurate responses", "Web or app integration", "Automated support & sales", "Continuous improvement"],
      },
      {
        icon: Database,
        name: "CRM Integration",
        description: "Connect your sales tools, contacts and tracking in one single place to manage your entire business.",
        price: "From $120",
        tag: "crm",
        color: "from-[#C8B8E8]/30 to-[#C8B8E8]/5",
        accent: "#9B8ED4",
        details: ["Centralize contacts & clients", "Automatic sales tracking", "Email & calendar sync", "Automated reports", "Sales pipeline setup"],
      },
    ],
    form: {
      title: "Request a service",
      subtitle: "Tell me what you need and I'll get back to you within 24 hours.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      service: "Service",
      selectService: "Select a service",
      description: "Description",
      descriptionPlaceholder: "Briefly describe what you need for your business...",
      send: "Send request",
      sending: "Sending...",
      success: "Request sent! I'll contact you within 24 hours.",
      error: "Something went wrong. Please try again.",
    },
    serviceOptions: [
      { value: "whatsapp", label: "WhatsApp Bot" },
      { value: "workflows", label: "Automated Workflows (n8n / Make)" },
      { value: "chatbot", label: "AI Chatbot" },
      { value: "crm", label: "CRM Integration" },
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

export default function Services() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = CONTENT[lang];
  const dark = theme === "dark";

  const [form, setForm] = useState({ name: "", email: "", service: "", description: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [modal, setModal] = useState<(typeof t.services)[0] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", service: "", description: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="services" className={`py-32 transition-colors duration-300 ${dark ? "bg-[#0a0a0c]" : "bg-[#FAFAFA]"}`}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          custom={0}
          variants={fadeUp}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-3">
            {t.label}
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${dark ? "text-white" : "text-[#1D1D1F]"}`}>
            {t.title}
          </h2>
          <p className={`text-lg max-w-xl ${dark ? "text-[#a1a1aa]" : "text-[#6E6E73]"}`}>{t.subtitle}</p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {t.services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.tag}
                initial="hidden"
                whileInView="visible"
                custom={0.1 + i * 0.1}
                variants={fadeUp}
                viewport={{ once: true, margin: "-60px" }}
                onClick={() => setModal(service)}
                className={`cursor-pointer rounded-2xl p-7 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                  dark
                    ? "bg-[#18181b] border-white/[0.06]"
                    : "bg-white border-black/[0.06]"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                  <Icon size={22} style={{ color: service.accent }} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${dark ? "text-white" : "text-[#1D1D1F]"}`}>{service.name}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-[#71717a]" : "text-[#6E6E73]"}`}>{service.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-base font-bold bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent">
                    {service.price}
                  </span>
                  <span className={`text-xs font-semibold ${dark ? "text-[#52525b]" : "text-[#6E6E73]"}`}>
                    {lang === "es" ? "Ver más →" : "Learn more →"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modal && (() => {
            const Icon = modal.icon;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                onClick={() => setModal(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className={`w-full max-w-lg shadow-2xl ${dark ? "bg-[#18181b]" : "bg-white"}`}
                  style={{ borderRadius: 0 }}
                >
                  {/* Modal header */}
                  <div className={`flex items-center justify-between px-8 pt-8 pb-6 border-b ${dark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${modal.color} flex items-center justify-center`}>
                        <Icon size={18} style={{ color: modal.accent }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-0.5" style={{ color: modal.accent }}>
                          {lang === "es" ? "Servicio" : "Service"}
                        </p>
                        <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-[#1D1D1F]"}`}>{modal.name}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setModal(null)}
                      className={`transition-colors ${dark ? "text-[#52525b] hover:text-white" : "text-[#AEAEB2] hover:text-[#1D1D1F]"}`}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Modal body */}
                  <div className="px-8 py-6">
                    <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-[#a1a1aa]" : "text-[#6E6E73]"}`}>{modal.description}</p>
                    <p className={`text-xs font-semibold tracking-[0.15em] uppercase mb-3 ${dark ? "text-[#52525b]" : "text-[#AEAEB2]"}`}>
                      {lang === "es" ? "Qué incluye" : "What's included"}
                    </p>
                    <ul className="flex flex-col gap-3 mb-8">
                      {modal.details.map((d, j) => (
                        <li key={j} className={`flex items-center gap-3 text-sm ${dark ? "text-[#a1a1aa]" : "text-[#3a3a3c]"}`}>
                          <span className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: modal.accent }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold bg-gradient-to-r from-[#6BBF9E] to-[#5BA8D4] bg-clip-text text-transparent">
                        {modal.price}
                      </span>
                      <button
                        onClick={() => {
                          setForm((f) => ({ ...f, service: modal.tag }));
                          setModal(null);
                          setTimeout(() => {
                            document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        className={`text-sm font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity ${dark ? "text-[#09090b]" : "text-[#1D1D1F]"}`}
                        style={{ background: `linear-gradient(135deg, #A8D5C2, #A8C8E8)`, borderRadius: 0 }}
                      >
                        {lang === "es" ? "Solicitar →" : "Request →"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Request Form */}
        <motion.div
          id="service-form"
          initial="hidden"
          whileInView="visible"
          custom={0.2}
          variants={fadeUp}
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#111111] rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-3">
              {lang === "es" ? "Contacto" : "Contact"}
            </p>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-2">{t.form.title}</h3>
            <p className="text-[#6E6E73] mb-8">{t.form.subtitle}</p>

            {status === "success" ? (
              <div className="flex items-center gap-3 bg-[#6BBF9E]/10 border border-[#6BBF9E]/30 rounded-2xl p-6">
                <CheckCircle size={24} className="text-[#6BBF9E] flex-shrink-0" />
                <p className="text-[#A8D5C2] font-medium">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#8E8E93] tracking-wide uppercase">{t.form.name}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.form.namePlaceholder}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#6E6E73] text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#8E8E93] tracking-wide uppercase">{t.form.email}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.form.emailPlaceholder}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#6E6E73] text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#8E8E93] tracking-wide uppercase">{t.form.service}</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#1D1D1F]">{t.form.selectService}</option>
                    {t.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#1D1D1F]">{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#8E8E93] tracking-wide uppercase">{t.form.description}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={t.form.descriptionPlaceholder}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#6E6E73] text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{t.form.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#A8D5C2] to-[#A8C8E8] text-[#1D1D1F] font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity duration-200 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t.form.sending}
                    </>
                  ) : (
                    t.form.send
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
