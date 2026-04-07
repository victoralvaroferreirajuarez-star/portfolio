"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  LogIn,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Send,
  LogOut,
  Inbox,
  ChevronRight,
  User,
  Mail,
  X,
} from "lucide-react";

type Request = {
  id: string;
  name: string;
  email: string;
  service: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  created_at: string;
};

type ChatMessage = {
  id: string;
  content: string;
  sender: "visitor" | "admin";
  created_at: string;
};

type ChatSession = {
  id: string;
  created_at: string;
  chat_messages: ChatMessage[];
};

const SERVICE_LABELS: Record<string, { label: string; color: string }> = {
  whatsapp: { label: "WhatsApp Bot", color: "#25D366" },
  workflows: { label: "Workflows", color: "#6BBF9E" },
  chatbot: { label: "Chatbot IA", color: "#5BA8D4" },
  crm: { label: "CRM", color: "#9B8ED4" },
};

const STATUS_CONFIG = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  in_progress: {
    label: "En proceso",
    icon: AlertCircle,
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
  },
  done: {
    label: "Completado",
    icon: CheckCircle,
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [tab, setTab] = useState<"requests" | "chats">("requests");
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "done">("all");

  // Chat state
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchRequests = async (pwd: string) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) {
        setLoginError("Contraseña incorrecta.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setRequests(data);
      setAuthed(true);
    } catch {
      setLoginError("Error de conexión.");
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ status }),
    });
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: status as Request["status"] } : r
      )
    );
    setUpdating(null);
  };

  const fetchChatSessions = async () => {
    try {
      const res = await fetch("/api/chat/sessions", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (Array.isArray(data)) setChatSessions(data);
    } catch {
      // ignore
    }
  };

  const sendAdminReply = async (sessionId: string) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    await fetch(`/api/chat/${sessionId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ content: replyText }),
    });
    setReplyText("");
    setSendingReply(false);
    await fetchChatSessions();
  };

  useEffect(() => {
    if (tab === "chats" && authed) {
      fetchChatSessions();
      chatPollRef.current = setInterval(fetchChatSessions, 4000);
      return () => {
        if (chatPollRef.current) clearInterval(chatPollRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, authed]);

  useEffect(() => {
    setTimeout(
      () => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  }, [activeChat, chatSessions]);

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#A8D5C2] to-[#A8C8E8] flex items-center justify-center">
              <span className="text-[#09090b] font-bold text-xl">a</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              avalito panel
            </h1>
            <p className="text-[#71717a] text-sm mt-1.5">
              Ingresa para gestionar tu negocio
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRequests(password);
            }}
            className="flex flex-col gap-3"
          >
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full bg-[#18181b] border border-[#27272a] rounded-xl px-4 py-3 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#6BBF9E]/60 focus:ring-1 focus:ring-[#6BBF9E]/20 transition-all"
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm flex items-center gap-1.5">
                <X size={12} />
                {loginError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="flex items-center justify-center gap-2 bg-white text-[#09090b] font-semibold py-3 rounded-xl hover:bg-white/90 transition-all disabled:opacity-40 text-sm"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <LogIn size={15} />
              )}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    done: requests.filter((r) => r.status === "done").length,
  };

  const filteredRequests =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const activeSession = chatSessions.find((s) => s.id === activeChat);
  const sortedMessages = activeSession
    ? [...activeSession.chat_messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    : [];

  const unreadChats = chatSessions.filter(
    (s) =>
      s.chat_messages.length > 0 &&
      s.chat_messages[s.chat_messages.length - 1]?.sender === "visitor"
  ).length;

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A8D5C2] to-[#A8C8E8] flex items-center justify-center">
              <span className="text-[#09090b] font-bold text-xs">a</span>
            </div>
            <span className="text-sm font-semibold text-white">avalito</span>
            <span className="text-[#52525b] text-sm">/</span>
            <span className="text-sm text-[#a1a1aa]">admin</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                tab === "requests"
                  ? fetchRequests(password)
                  : fetchChatSessions()
              }
              className="p-2 rounded-lg text-[#71717a] hover:text-white hover:bg-[#27272a] transition-all"
              aria-label="Refresh"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => {
                setAuthed(false);
                setPassword("");
                setRequests([]);
              }}
              className="p-2 rounded-lg text-[#71717a] hover:text-red-400 hover:bg-red-500/10 transition-all"
              aria-label="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* ── TABS ── */}
        <div className="flex gap-1 mb-6 bg-[#18181b] border border-[#27272a] rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab("requests")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "requests"
                ? "bg-white text-[#09090b]"
                : "text-[#71717a] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <Inbox size={14} />
              Solicitudes
              {counts.pending > 0 && (
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-semibold">
                  {counts.pending}
                </span>
              )}
            </span>
          </button>
          <button
            onClick={() => setTab("chats")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === "chats"
                ? "bg-white text-[#09090b]"
                : "text-[#71717a] hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={14} />
              Chats
              {unreadChats > 0 && (
                <span className="text-[10px] bg-[#6BBF9E]/20 text-[#6BBF9E] px-1.5 py-0.5 rounded-full font-semibold">
                  {unreadChats}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* ── REQUESTS TAB ── */}
        {tab === "requests" && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(
                [
                  { key: "all", label: "Total", icon: Inbox, color: "text-white" },
                  { key: "pending", label: "Pendientes", icon: Clock, color: "text-amber-400" },
                  { key: "in_progress", label: "En proceso", icon: AlertCircle, color: "text-blue-400" },
                  { key: "done", label: "Completados", icon: CheckCircle, color: "text-emerald-400" },
                ] as const
              ).map((stat) => (
                <button
                  key={stat.key}
                  onClick={() => setFilter(stat.key)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    filter === stat.key
                      ? "bg-[#18181b] border-[#3f3f46]"
                      : "bg-[#09090b] border-[#27272a] hover:border-[#3f3f46]"
                  }`}
                >
                  <stat.icon size={16} className={stat.color} />
                  <div className="text-left">
                    <p className="text-xl font-bold text-white leading-none">
                      {counts[stat.key]}
                    </p>
                    <p className="text-[11px] text-[#71717a] mt-0.5">{stat.label}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Requests list */}
            {filteredRequests.length === 0 ? (
              <div className="text-center py-20">
                <Inbox size={36} className="mx-auto mb-3 text-[#27272a]" />
                <p className="text-[#71717a]">No hay solicitudes {filter !== "all" ? "con este filtro" : "todavía"}.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredRequests.map((req) => {
                  const svc = SERVICE_LABELS[req.service] ?? {
                    label: req.service,
                    color: "#6BBF9E",
                  };
                  const st = STATUS_CONFIG[req.status];
                  return (
                    <div
                      key={req.id}
                      className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 hover:border-[#3f3f46] transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                              <User size={13} className="text-[#52525b]" />
                              {req.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.bg} ${st.text} border ${st.border}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          </div>

                          <p className="text-[#a1a1aa] text-sm flex items-center gap-1.5 mb-2">
                            <Mail size={12} className="text-[#52525b]" />
                            {req.email}
                          </p>

                          <span
                            className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3"
                            style={{
                              backgroundColor: `${svc.color}15`,
                              color: svc.color,
                            }}
                          >
                            {svc.label}
                          </span>

                          <p className="text-[#a1a1aa] text-sm leading-relaxed">
                            {req.description}
                          </p>

                          <p className="text-[11px] text-[#52525b] mt-3">
                            {new Date(req.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>

                        {/* Status buttons */}
                        <div className="flex md:flex-col gap-2 md:min-w-[130px]">
                          {(["pending", "in_progress", "done"] as const).map(
                            (s) => {
                              const cfg = STATUS_CONFIG[s];
                              const isActive = req.status === s;
                              return (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(req.id, s)}
                                  disabled={isActive || updating === req.id}
                                  className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border transition-all w-full ${
                                    isActive
                                      ? `${cfg.bg} ${cfg.text} ${cfg.border}`
                                      : "border-[#27272a] text-[#71717a] hover:border-[#3f3f46] hover:text-white"
                                  } disabled:opacity-50`}
                                >
                                  <cfg.icon size={12} />
                                  {updating === req.id ? "..." : cfg.label}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── CHATS TAB ── */}
        {tab === "chats" && (
          <div className="flex gap-4 h-[calc(100vh-180px)] min-h-[500px]">
            {/* Sessions sidebar */}
            <div className="w-72 flex-shrink-0 flex flex-col bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#27272a]">
                <p className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                  Conversaciones ({chatSessions.length})
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chatSessions.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <MessageSquare
                      size={28}
                      className="mx-auto mb-3 text-[#27272a]"
                    />
                    <p className="text-sm text-[#52525b]">Sin chats</p>
                  </div>
                ) : (
                  chatSessions.map((session) => {
                    const msgs = [...session.chat_messages].sort(
                      (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    );
                    const last = msgs[msgs.length - 1];
                    const isUnread = last?.sender === "visitor";
                    const isActive = activeChat === session.id;

                    return (
                      <button
                        key={session.id}
                        onClick={() => setActiveChat(session.id)}
                        className={`w-full text-left px-4 py-3.5 border-b border-[#27272a]/50 transition-all flex items-center gap-3 ${
                          isActive
                            ? "bg-[#27272a]"
                            : "hover:bg-[#27272a]/50"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {isUnread && (
                              <span className="w-2 h-2 rounded-full bg-[#6BBF9E] flex-shrink-0" />
                            )}
                            <p className="text-xs text-[#a1a1aa] font-mono">
                              #{session.id.slice(0, 8)}
                            </p>
                          </div>
                          {last ? (
                            <p className="text-xs text-[#71717a] truncate">
                              {last.sender === "admin" && (
                                <span className="text-[#6BBF9E]">Tú: </span>
                              )}
                              {last.content}
                            </p>
                          ) : (
                            <p className="text-xs text-[#52525b] italic">
                              Sin mensajes
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          size={14}
                          className={`text-[#52525b] flex-shrink-0 transition-transform ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Conversation panel */}
            <div className="flex-1 flex flex-col bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
              {!activeChat ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[#52525b] gap-2">
                  <MessageSquare size={32} />
                  <p className="text-sm">Selecciona una conversación</p>
                </div>
              ) : (
                <>
                  {/* Chat header */}
                  <div className="px-5 py-3.5 border-b border-[#27272a] flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6BBF9E]" />
                      <p className="text-sm font-medium text-white">
                        Sesión #{activeChat.slice(0, 8)}
                      </p>
                    </div>
                    <p className="text-xs text-[#52525b]">
                      {sortedMessages.length} mensajes
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                    {sortedMessages.length === 0 ? (
                      <p className="text-xs text-[#52525b] text-center mt-8">
                        Sin mensajes en esta sesión.
                      </p>
                    ) : (
                      sortedMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[72%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                              msg.sender === "admin"
                                ? "bg-gradient-to-r from-[#A8D5C2] to-[#A8C8E8] text-[#09090b]"
                                : "bg-[#27272a] text-[#e4e4e7]"
                            }`}
                          >
                            {msg.content}
                            <p
                              className={`text-[10px] mt-1 ${
                                msg.sender === "admin"
                                  ? "text-[#09090b]/50"
                                  : "text-[#52525b]"
                              }`}
                            >
                              {new Date(msg.created_at).toLocaleTimeString(
                                "es-ES",
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Reply input */}
                  <div className="px-4 py-3 border-t border-[#27272a] flex items-center gap-2 flex-shrink-0">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendAdminReply(activeChat);
                        }
                      }}
                      placeholder="Escribe tu respuesta..."
                      className="flex-1 bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2.5 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#6BBF9E]/50 focus:ring-1 focus:ring-[#6BBF9E]/20 transition-all"
                    />
                    <button
                      onClick={() => sendAdminReply(activeChat)}
                      disabled={!replyText.trim() || sendingReply}
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center disabled:opacity-30 transition-all bg-gradient-to-r from-[#A8D5C2] to-[#A8C8E8] hover:opacity-90"
                    >
                      {sendingReply ? (
                        <Loader2
                          size={15}
                          className="text-[#09090b] animate-spin"
                        />
                      ) : (
                        <Send size={15} className="text-[#09090b]" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
