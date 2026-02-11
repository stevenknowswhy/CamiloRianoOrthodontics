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
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Validate email format
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

    // Build detailed message from assessment data
    const assessmentDetails = [
      `Patient Age: ${body.patientAge || 'Not specified'}`,
      `Primary Concern: ${body.concern || 'Not specified'}`,
      `Treatment Interest: ${body.treatment || 'Not specified'}`,
      `Preferred Location: ${body.location || 'Not specified'}`,
      `Timeline: ${body.timeline || 'Not specified'}`,
      `Insurance: ${body.insurance || 'Not specified'}`,
      '',
      '--- Contact Information ---',
      `Name: ${body.firstName} ${body.lastName}`,
      `Phone: ${body.phone || 'Not provided'}`,
      `Email: ${body.email}`,
      `Date of Birth: ${body.dateOfBirth || 'Not provided'}`,
      '',
      '--- Consent ---',
      `Privacy Policy Accepted: ${body.privacyConsent ? 'Yes' : 'No'}`,
      `Marketing Consent: ${body.marketingConsent ? 'Yes' : 'No'}`,
    ].join('\n');

    const result = await sendContactEmail({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      location: body.location?.toLowerCase().includes('sonoma') ? 'sonoma' : 'san-francisco',
      formType: 'smile-assessment',
      message: assessmentDetails,
    });

    if (!result.success) {
      console.error('Assessment API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or call our office.' },
        { status: 500, headers: getRateLimitHeaders(clientId) }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Assessment submitted successfully' },
      { status: 200, headers: getRateLimitHeaders(clientId) }
    );

  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getRateLimitHeaders(clientId) }
    );
  }
}
