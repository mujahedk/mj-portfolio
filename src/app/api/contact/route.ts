import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { site } from '@/config/site';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_DURATION = 10 * 1000; // 10 seconds

function isRateLimited(ip: string): boolean {
  const lastRequestTime = rateLimitMap.get(ip);
  const now = Date.now();

  if (lastRequestTime && (now - lastRequestTime < RATE_LIMIT_DURATION)) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('A valid email is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }

  return { isValid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Email service is unavailable.');
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 }
    );
  }

  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // Check rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait 10 seconds before trying again.' },
      { status: 429 }
    );
  }

  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { isValid, errors } = validateContactForm(body);
  if (!isValid) {
    return NextResponse.json(
      { error: 'Validation failed', details: errors },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  // Initialize Resend with API key
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Send email using Resend
  try {
    const emailResult = await resend.emails.send({
      from: 'Portfolio Contact <noreply@mj-portfolio.vercel.app>', // Replace with your verified domain
      to: [site.email],
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="border: 1px solid #eee; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
            ${message}
          </p>
          <p style="font-size: 0.8em; color: #777;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nThis email was sent from your portfolio contact form.`,
    });

    if (emailResult.data) {
      return NextResponse.json({ message: 'Email sent successfully!' });
    } else {
      console.error('Resend email error:', emailResult.error);
      return NextResponse.json(
        { error: emailResult.error?.message || 'Failed to send email via Resend' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Adjust as needed for production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
