import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;

export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  message: string;
  location?: 'san-francisco' | 'sonoma' | 'both';
  formType?: 'contact' | 'smile-assessment' | 'doctor-referral' | 'virtual-care';
  [key: string]: unknown;
}

export async function sendContactEmail(data: ContactFormData) {
  const fromEmail = process.env.FROM_EMAIL || 'noreply@docrianos.com';
  const toEmailSF = process.env.TO_EMAIL_SF || 'info@docrianos.com';
  const toEmailSonoma = process.env.TO_EMAIL_SONOMA || 'infosonoma@docrianos.com';
  
  // Determine recipient based on location preference
  let toEmails: string[] = [toEmailSF];
  if (data.location === 'sonoma') {
    toEmails = [toEmailSonoma];
  } else if (data.location === 'both' || !data.location) {
    toEmails = [toEmailSF, toEmailSonoma];
  }
  
  const name = data.firstName && data.lastName 
    ? `${data.firstName} ${data.lastName}`
    : data.name || 'Unknown';
  
  const subject = `New ${data.formType || 'Contact'} Form Submission from ${name}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4533f; padding-bottom: 10px;">
        New Submission from docrianos.com
      </h2>
      
      <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.location ? `<p><strong>Preferred Location:</strong> ${data.location}</p>` : ''}
        ${data.formType ? `<p><strong>Form Type:</strong> ${data.formType}</p>` : ''}
      </div>
      
      <div style="background: #fff; padding: 20px; border: 1px solid #d4d4d4; border-radius: 8px;">
        <h3 style="color: #1a1a1a; margin-top: 0;">Message/Details:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      ${Object.keys(data).length > 7 ? `
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
        <h4 style="color: #666; margin-top: 0;">Additional Information:</h4>
        <pre style="background: #fff; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">
${JSON.stringify(data, null, 2)}
        </pre>
      </div>
      ` : ''}
      
      <hr style="border: none; border-top: 1px solid #d4d4d4; margin: 30px 0;" />
      <p style="color: #666; font-size: 12px;">
        This email was sent from the contact form on docrianos.com
      </p>
    </div>
  `;
  
  try {
    const result = await resend.emails.send({
      from: `Dr. Riaño Orthodontics <${fromEmail}>`,
      to: toEmails,
      subject,
      html,
      replyTo: data.email,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
