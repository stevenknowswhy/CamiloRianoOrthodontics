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
      body.address ? `${body.address}` : '',
      body.address2 ? `${body.address2}` : '',
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
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Virtual care request submitted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Virtual Care API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
