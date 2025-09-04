import { NextRequest, NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Send email to your inbox
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You'll need to verify your domain
      to: [process.env.CONTACT_EMAIL || "ivermin1123@gmail.com"], // Your email address
      subject: `New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This message was sent from your portfolio contact form at ${req.headers.get("origin") || "your-portfolio.com"}
          </p>
        </div>
      `,
      reply_to: email, // So you can reply directly to the sender
    });

    if (error) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
