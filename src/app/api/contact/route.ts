import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/resend';
import { checkRateLimit, getClientIdentifier, getRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Check rate limit
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(clientId),
      }
    );
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Validate email format with better regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Validate email length
    if (body.email.length > 254) {
      return NextResponse.json(
        { error: 'Email address is too long' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Validate message length
    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Send email
    const result = await sendContactEmail({
      ...body,
      formType: body.formType || 'contact',
    });

    if (!result.success) {
      // Don't expose internal error details to client
      console.error('Contact API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or call our office.' },
        { status: 500, headers: getRateLimitHeaders(clientId) }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200, headers: getRateLimitHeaders(clientId) }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getRateLimitHeaders(clientId) }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    { status: 'Contact API is running' },
    { status: 200 }
  );
}
