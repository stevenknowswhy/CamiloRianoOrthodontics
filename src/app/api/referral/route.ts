import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.patientFirstName || !body.patientLastName || !body.patientEmail) {
      return NextResponse.json(
        { error: 'Patient information is required' },
        { status: 400 }
      );
    }
    
    if (!body.doctorFirstName || !body.doctorLastName) {
      return NextResponse.json(
        { error: 'Referring doctor information is required' },
        { status: 400 }
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
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Referral submitted successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
