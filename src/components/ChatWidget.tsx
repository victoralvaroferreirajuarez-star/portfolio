"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type Message = {
  id: string;
  content: string;
  sender: "visitor" | "admin";
  created_at: string;
};

const playNotificationSound = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // audio not available
  }
};

export default function ChatWidget() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const knownIdsRef = useRef<Set<string>>(new Set());

  const fetchMessages = async (sid: string) => {
    try {
      const res = await fetch(`/api/chat/${sid}`);
      const data: Message[] = await res.json();
      if (Array.isArray(data)) {
        const newAdminMsg = data.some(
          (m) => m.sender === "admin" && !knownIdsRef.current.has(m.id)
        );
        if (newAdminMsg && knownIdsRef.current.size > 0) {
          playNotificationSound();
        }
        data.forEach((m) => knownIdsRef.current.add(m.id));
        setMessages(data);
      }
    } catch {
      // ignore
    }
  };

  const initSession = async () => {
    const stored =
      typeof window !== "undefined"
        ? sessionStorage.getItem("chat_session_id")
        : null;
    if (stored) {
      setSessionId(stored);
      await fetchMessages(stored);
      return;
    }
    setInitializing(true);
    try {
      const res = await fetch("/api/chat", { method: "POST" });
      const data = await res.json();
      if (data.sessionId) {
        sessionStorage.setItem("chat_session_id", data.sessionId);
        setSessionId(data.sessionId);
      }
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    if (open && sessionId) {
      pollRef.current = setInterval(() => fetchMessages(sessionId), 3000);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [open, sessionId]);

  useEffect(() => {
    if (open) {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    }
  }, [messages.length, open]);

  const handleOpen = async () => {
    setOpen(true);
    if (!sessionId) {
      await initSession();
    } else {
      fetchMessages(sessionId);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || sending) return;
    const content = input.trim();
    setInput("");
    setSending(true);

    const temp: Message = {
      id: `temp-${Date.now()}`,
      content,
      sender: "visitor",
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, temp]);

    try {
      await fetch(`/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      await fetchMessages(sessionId);
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== temp.id));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{
              duration: 0.22,
              ease: [0.6, 0, 0.05, 1] as [number, number, number, number],
            }}
            className={`flex flex-col shadow-2xl w-[320px] border ${dark ? "bg-[#0d0d0d] border-white/10" : "bg-white border-black/10"}`}
            style={{ borderRadius: 16, height: 460, overflow: "hidden" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #A8D5C2 0%, #A8C8E8 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1D1D1F]/50" />
                <span className="text-sm font-semibold text-[#1D1D1F]">
                  Chat en vivo
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 min-h-0">
              {/* Static welcome bubble */}
              <div
                className={`text-sm px-3.5 py-2.5 self-start max-w-[80%] ${dark ? "bg-white/10 text-white" : "bg-[#F5F5F7] text-[#1D1D1F]"}`}
                style={{ borderRadius: 12 }}
              >
                ¡Hola! Soy Alvaro 👋 ¿En qué puedo ayudarte?
              </div>

              {initializing ? (
                <div className="flex justify-center py-4">
                  <Loader2 size={16} className="animate-spin text-[#6BBF9E]" />
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "visitor" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] px-3.5 py-2 text-sm leading-relaxed ${
                        msg.sender === "visitor"
                          ? "text-[#1D1D1F]"
                          : dark
                            ? "bg-white/10 text-white"
                            : "bg-[#F5F5F7] text-[#1D1D1F]"
                      }`}
                      style={{
                        borderRadius: 12,
                        ...(msg.sender === "visitor" && {
                          background:
                            "linear-gradient(135deg, #A8D5C2, #A8C8E8)",
                        }),
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className={`px-3 py-3 border-t flex items-center gap-2 flex-shrink-0 ${dark ? "border-white/10" : "border-black/10"}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe un mensaje..."
                disabled={initializing || !sessionId}
                className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#6BBF9E]/40 transition-colors disabled:opacity-50 ${
                  dark
                    ? "bg-white/5 border border-white/10 text-white placeholder-[#6E6E73]"
                    : "bg-[#F5F5F7] border border-black/10 text-[#1D1D1F] placeholder-[#8E8E93]"
                }`}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending || !sessionId}
                className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #A8D5C2, #A8C8E8)",
                }}
                aria-label="Enviar"
              >
                {sending ? (
                  <Loader2 size={14} className="text-[#1D1D1F] animate-spin" />
                ) : (
                  <Send size={14} className="text-[#1D1D1F]" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble button */}
      <motion.button
        onClick={open ? () => setOpen(false) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #A8D5C2, #A8C8E8)" }}
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} className="text-[#1D1D1F]" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={22} className="text-[#1D1D1F]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
