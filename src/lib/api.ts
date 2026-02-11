// API client utilities for form submissions

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

async function post<T>(endpoint: string, data: T): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Something went wrong',
      };
    }
    
    return {
      success: true,
      message: result.message,
    };
    
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// Contact form submission
export interface ContactFormData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  message: string;
  location?: 'san-francisco' | 'sonoma' | 'both';
}

export function submitContactForm(data: ContactFormData) {
  return post('contact', { ...data, formType: 'contact' });
}

// Smile assessment submission
export interface SmileAssessmentData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  patientAge?: string;
  concern?: string;
  treatment?: string;
  location?: string;
  timeline?: string;
  insurance?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export function submitSmileAssessment(data: SmileAssessmentData) {
  return post('assessment', data);
}

// Doctor referral submission
export interface DoctorReferralData {
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone?: string;
  preferredLocation?: string;
  doctorFirstName: string;
  doctorLastName: string;
  referralReason?: string;
  xRays?: string;
  comments?: string;
}

export function submitDoctorReferral(data: DoctorReferralData) {
  return post('referral', data);
}

// Virtual care submission
export interface VirtualCareData {
  patientType?: 'new' | 'existing';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  insurance?: string;
  concerns?: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export function submitVirtualCare(data: VirtualCareData) {
  return post('virtual-care', data);
}
