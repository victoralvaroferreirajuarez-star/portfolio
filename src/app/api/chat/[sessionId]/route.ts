import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  if (!sessionId || sessionId.length > 100) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, content, sender, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const ip = getClientIp(req.headers);

  if (isRateLimited(`chat-msg:${ip}`, 20, 60_000)) {
    return NextResponse.json(
      { error: "Too many messages" },
      { status: 429 }
    );
  }

  const { sessionId } = await params;

  if (!sessionId || sessionId.length > 100) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const { content } = await req.json();

  if (!content?.trim() || content.length > 1000) {
    return NextResponse.json(
      { error: "Message must be 1-1000 characters" },
      { status: 400 }
    );
  }

  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id")
    .eq("id", sessionId)
    .single();

  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const { error } = await supabase
    .from("chat_messages")
    .insert({ session_id: sessionId, content: content.trim(), sender: "visitor" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
