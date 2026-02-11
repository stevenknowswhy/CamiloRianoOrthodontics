// Environment variable validation
// Validates required environment variables at application startup

const requiredEnvVars = {
  RESEND_API_KEY: 'Resend API key for sending emails',
  FROM_EMAIL: 'Sender email address for notifications',
} as const;

const optionalEnvVars = {
  TO_EMAIL_SF: 'San Francisco practice email (defaults to info@docrianos.com)',
  TO_EMAIL_SONOMA: 'Sonoma practice email (defaults to infosonoma@docrianos.com)',
} as const;

type EnvVar = keyof typeof requiredEnvVars;
type OptionalEnvVar = keyof typeof optionalEnvVars;

const errors: string[] = [];
const warnings: string[] = [];

// Validate required environment variables
for (const [key, description] of Object.entries(requiredEnvVars)) {
  if (!process.env[key]) {
    errors.push(`❌ MISSING: ${key} - ${description}`);
  }
}

// Validate optional environment variables and provide defaults
const envWithDefaults: Record<string, string> = {};

for (const [key, description] of Object.entries(optionalEnvVars)) {
  const value = process.env[key];
  if (!value) {
    warnings.push(`⚠️  OPTIONAL: ${key} - ${description}`);
    // Set defaults
    if (key === 'TO_EMAIL_SF') {
      envWithDefaults[key] = 'info@docrianos.com';
    } else if (key === 'TO_EMAIL_SONOMA') {
      envWithDefaults[key] = 'infosonoma@docrianos.com';
    }
  } else {
    envWithDefaults[key] = value;
  }
}

// Log results in development
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  if (errors.length > 0) {
    console.error('\n=== Environment Variable Errors ===');
    errors.forEach(err => console.error(err));
    console.error('==================================\n');
  }

  if (warnings.length > 0) {
    console.warn('\n=== Environment Variable Warnings ===');
    warnings.forEach(warn => console.warn(warn));
    console.warn('===================================\n');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All environment variables validated successfully');
  }
}

// Export validated environment accessors
export function getEnv(key: EnvVar): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable "${key}" is not set`);
  }
  return value;
}

export function getEnvWithDefault(key: OptionalEnvVar, defaultValue: string): string {
  return process.env[key] || envWithDefaults[key] || defaultValue;
}

// Safe environment variable access for Resend
export const validatedEnv = {
  RESEND_API_KEY: getEnv('RESEND_API_KEY'),
  FROM_EMAIL: getEnv('FROM_EMAIL'),
  TO_EMAIL_SF: getEnvWithDefault('TO_EMAIL_SF', 'info@docrianos.com'),
  TO_EMAIL_SONOMA: getEnvWithDefault('TO_EMAIL_SONOMA', 'infosonoma@docrianos.com'),
};

// Export validation status
export const envValidation = {
  isValid: errors.length === 0,
  errors,
  warnings,
};

// Fail fast in production if required vars are missing
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && errors.length > 0) {
  throw new Error(
    `Cannot start application: Missing required environment variables:\n${errors.join('\n')}`
  );
}
