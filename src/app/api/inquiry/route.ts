import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { interestOptions, validateInquiry, type InquiryInput } from "@/lib/inquiry";

export const runtime = "nodejs";

/**
 * Inquiry endpoint.
 *
 * Delivery (first match wins):
 *  1. RESEND_API_KEY + INQUIRY_TO_EMAIL (+ optional INQUIRY_FROM_EMAIL): sends via Resend's HTTP API.
 *  2. Development only (NODE_ENV !== "production"): appends to .data/inquiries.jsonl for local testing.
 *  3. Otherwise responds 503 so the visitor is told to email instead. A lead is never silently dropped.
 *
 * Spam protection: honeypot field, minimum fill time, per-IP rate limit, and optional
 * Cloudflare Turnstile (set TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY).
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  // Honeypot: real visitors never see or fill this field. Respond as if successful.
  if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  // Minimum time on form (bots submit instantly).
  const started = Number(body.started);
  if (!Number.isFinite(started) || Date.now() - started < 2500) {
    return NextResponse.json({ ok: false, error: "That was quick! Please take a moment and submit again." }, { status: 400 });
  }

  // Optional Turnstile verification
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = typeof body.turnstile === "string" ? body.turnstile : "";
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    })
      .then((r) => r.json() as Promise<{ success: boolean }>)
      .catch(() => ({ success: false }));
    if (!verify.success) return NextResponse.json({ ok: false, error: "Spam check failed. Please try again." }, { status: 400 });
  }

  const { data, errors } = validateInquiry(body);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const record = { ...data, receivedAt: new Date().toISOString() };

  // 1. Resend
  if (process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL ?? "Flowsites <onboarding@resend.dev>",
        to: [process.env.INQUIRY_TO_EMAIL],
        reply_to: data.email,
        subject: `New ${interestOptions[data.interest]}: ${data.business} (${data.location})`,
        html: renderEmail(data),
        text: Object.entries(record)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
      }),
    }).catch(() => null);
    if (res && res.ok) return NextResponse.json({ ok: true, delivery: "email" });
    console.error("[inquiry] Resend delivery failed", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ ok: false, error: "We couldn't send your message just now. Please email us directly." }, { status: 502 });
  }

  // 2. Local development store
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "inquiries.jsonl"), JSON.stringify(record) + "\n");
    return NextResponse.json({ ok: true, delivery: "local-dev" });
  }

  // 3. Not configured in production
  console.error("[inquiry] No delivery configured. Set RESEND_API_KEY and INQUIRY_TO_EMAIL.");
  return NextResponse.json({ ok: false, error: "Our form isn't accepting messages right now. Please email us directly." }, { status: 503 });
}

function renderEmail(d: InquiryInput) {
  const rows: [string, string | undefined][] = [
    ["Interest", interestOptions[d.interest]],
    ["Name", d.name],
    ["Business", d.business],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Website", d.website],
    ["Industry", d.industry],
    ["Location", d.location],
    ["What to improve", d.improve],
  ];
  return `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">${k}</td><td style="padding:6px 12px;white-space:pre-wrap">${esc(v!)}</td></tr>`)
    .join("")}</table>`;
}
