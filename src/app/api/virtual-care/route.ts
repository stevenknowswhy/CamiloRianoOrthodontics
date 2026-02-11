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

    // Build detailed message from virtual care data
    const patientType = body.patientType === 'existing' ? 'Existing Patient' : 'New Patient';

    const virtualCareDetails = [
      `Patient Type: ${patientType}`,
      '',
      '--- CONTACT INFORMATION ---',
      `Name: ${body.firstName} ${body.lastName}`,
      `Phone: ${body.phone || 'Not provided'}`,
      `Email: ${body.email}`,
      body.age ? `Age: ${body.age}` : '',
      '',
      '--- ADDRESS ---',
      body.address || '',
      body.address2 || '',
      body.city || body.state || body.zip ? `${body.city || ''}, ${body.state || ''} ${body.zip || ''}` : '',
      '',
      '--- ADDITIONAL INFORMATION ---',
      body.insurance ? `Insurance: ${body.insurance}` : '',
      body.concerns ? `Concerns: ${body.concerns}` : '',
      body.message ? `Message: ${body.message}` : '',
      '',
      '--- CONSENT ---',
      `Privacy Policy Accepted: ${body.privacyConsent ? 'Yes' : 'No'}`,
      `Marketing Consent: ${body.marketingConsent ? 'Yes' : 'No'}`,
    ].filter(Boolean).join('\n');

    const result = await sendContactEmail({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      formType: 'virtual-care',
      message: virtualCareDetails,
    });

    if (!result.success) {
      console.error('Virtual Care API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or call our office.' },
        { status: 500, headers: getRateLimitHeaders(clientId) }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Virtual care request submitted successfully' },
      { status: 200, headers: getRateLimitHeaders(clientId) }
    );

  } catch (error) {
    console.error('Virtual Care API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getRateLimitHeaders(clientId) }
    );
  }
}
