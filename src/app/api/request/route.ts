import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const VALID_SERVICES = ["whatsapp", "workflows", "chatbot", "crm"];

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  if (isRateLimited(`request:${ip}`, 3, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const { name, email, service, description } = await req.json();

  if (!name || !email || !service || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (name.length > 100 || email.length > 200 || description.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!VALID_SERVICES.includes(service)) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }

  const { error } = await supabase
    .from("requests")
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      service,
      description: description.trim(),
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
