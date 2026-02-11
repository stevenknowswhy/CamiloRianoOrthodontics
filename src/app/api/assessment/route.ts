import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
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
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Assessment submitted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
