
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // In real life, send email via an API (Resend/SES/etc.).
    // Here we just parse and succeed.
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) return NextResponse.json({ ok: false }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
