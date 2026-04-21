import { NextResponse } from "next/server";
import { Resend } from "resend";

const GENERAL_RECIPIENTS = ["info@ecotracegreen.com", "hello@ecotracegreen.com"] as const;
const LEGAL_RECIPIENTS = ["legal@ecotracegreen.com"] as const;
const ADMIN_RECIPIENTS = ["admin@ecotracegreen.com"] as const;

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  inquiry: string;
  productVertical?: string;
  industrySector?: string;
  productOfInterest?: string;
  message: string;
};

function pickRecipients(payload: ContactPayload) {
  const inquiry = payload.inquiry.toLowerCase();

  const inquiryRecipientMap: Record<string, readonly string[]> = {
    general: GENERAL_RECIPIENTS,
    sales: GENERAL_RECIPIENTS,
    demo: GENERAL_RECIPIENTS,
    whitepaper: ADMIN_RECIPIENTS,
    partnerships: ADMIN_RECIPIENTS,
    legal: LEGAL_RECIPIENTS,
    admin: ADMIN_RECIPIENTS,
  };

  return [...(inquiryRecipientMap[inquiry] ?? GENERAL_RECIPIENTS)];
}

function sanitize(value: string | undefined) {
  if (!value) return "";
  return value.trim();
}

function validate(payload: Partial<ContactPayload>): payload is ContactPayload {
  return Boolean(
    payload.firstName &&
      payload.lastName &&
      payload.email &&
      payload.inquiry &&
      payload.message,
  );
}

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email service is not configured. Set RESEND_API_KEY in environment." },
      { status: 500 },
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const payload: Partial<ContactPayload> = {
    firstName: sanitize(body.firstName),
    lastName: sanitize(body.lastName),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    company: sanitize(body.company),
    jobTitle: sanitize(body.jobTitle),
    inquiry: sanitize(body.inquiry),
    productVertical: sanitize(body.productVertical),
    industrySector: sanitize(body.industrySector),
    productOfInterest: sanitize(body.productOfInterest),
    message: sanitize(body.message),
  };

  if (!validate(payload)) {
    return NextResponse.json(
      { error: "Missing required fields: firstName, lastName, email, inquiry, message." },
      { status: 400 },
    );
  }

  const recipients = pickRecipients(payload);
  const from = process.env.CONTACT_FROM_EMAIL ?? "EcoTrace Contact <onboarding@resend.dev>";
  const replyTo = payload.email;
  const subject = `EcoTrace contact inquiry: ${payload.inquiry}`;

  const lines = [
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "N/A"}`,
    `Company: ${payload.company || "N/A"}`,
    `Job Title: ${payload.jobTitle || "N/A"}`,
    `Inquiry Type: ${payload.inquiry}`,
    `Product Vertical: ${payload.productVertical || "N/A"}`,
    `Industry Sector: ${payload.industrySector || "N/A"}`,
    `Product of Interest: ${payload.productOfInterest || "N/A"}`,
    "",
    "Message:",
    payload.message,
  ];

  try {
    await resend.emails.send({
      from,
      to: recipients,
      replyTo,
      subject,
      text: lines.join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin: 0 0 12px;">EcoTrace Contact Inquiry</h2>
          <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone || "N/A"}</p>
          <p><strong>Company:</strong> ${payload.company || "N/A"}</p>
          <p><strong>Job Title:</strong> ${payload.jobTitle || "N/A"}</p>
          <p><strong>Inquiry Type:</strong> ${payload.inquiry}</p>
          <p><strong>Product Vertical:</strong> ${payload.productVertical || "N/A"}</p>
          <p><strong>Industry Sector:</strong> ${payload.industrySector || "N/A"}</p>
          <p><strong>Product of Interest:</strong> ${payload.productOfInterest || "N/A"}</p>
          <hr style="margin: 16px 0;" />
          <p style="white-space: pre-line;"><strong>Message:</strong><br/>${payload.message}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
