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
    if (!body.patientFirstName || !body.patientLastName || !body.patientEmail) {
      return NextResponse.json(
        { error: 'Patient information is required' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    if (!body.doctorFirstName || !body.doctorLastName) {
      return NextResponse.json(
        { error: 'Referring doctor information is required' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.patientEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: getRateLimitHeaders(clientId) }
      );
    }

    // Build detailed message from referral data
    const referralDetails = [
      '--- PATIENT INFORMATION ---',
      `Name: ${body.patientFirstName} ${body.patientLastName}`,
      `Email: ${body.patientEmail}`,
      `Phone: ${body.patientPhone || 'Not provided'}`,
      `Preferred Location: ${body.preferredLocation || 'Not specified'}`,
      '',
      '--- REFERRING DOCTOR ---',
      `Name: Dr. ${body.doctorFirstName} ${body.doctorLastName}`,
      '',
      '--- CLINICAL DETAILS ---',
      `Reason for Referral: ${body.referralReason || 'Not specified'}`,
      `X-Rays: ${body.xRays || 'Not specified'}`,
      '',
      '--- COMMENTS ---',
      body.comments || 'No additional comments provided.',
    ].join('\n');

    const result = await sendContactEmail({
      firstName: body.doctorFirstName,
      lastName: body.doctorLastName,
      email: body.patientEmail, // Use patient email for reply-to
      phone: body.patientPhone,
      location: body.preferredLocation?.toLowerCase().includes('sonoma') ? 'sonoma' : 'san-francisco',
      formType: 'doctor-referral',
      message: referralDetails,
    });

    if (!result.success) {
      console.error('Referral API error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or call our office.' },
        { status: 500, headers: getRateLimitHeaders(clientId) }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Referral submitted successfully' },
      { status: 200, headers: getRateLimitHeaders(clientId) }
    );

  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getRateLimitHeaders(clientId) }
    );
  }
}
