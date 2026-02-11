// Simple in-memory rate limiter for API routes
// Note: For production with multiple server instances, use Redis or Vercel's rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const limitWindow = 60 * 1000; // 1 minute in milliseconds
const maxRequests = 5; // Max 5 requests per minute per IP

// In-memory store (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  remaining?: number;
  resetTime?: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries for this identifier
  if (entry && entry.resetTime < now) {
    rateLimitStore.delete(identifier);
  }

  const currentEntry = rateLimitStore.get(identifier);

  if (!currentEntry) {
    // First request or expired entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + limitWindow,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + limitWindow,
    };
  }

  if (currentEntry.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      resetTime: currentEntry.resetTime,
    };
  }

  // Increment counter
  currentEntry.count++;
  return {
    success: true,
    remaining: maxRequests - currentEntry.count,
    resetTime: currentEntry.resetTime,
  };
}

export function getRateLimitHeaders(identifier: string): Record<string, string> {
  const entry = rateLimitStore.get(identifier);
  if (!entry) {
    return {
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': maxRequests.toString(),
      'X-RateLimit-Reset': Math.ceil((Date.now() + limitWindow) / 1000).toString(),
    };
  }

  return {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': Math.max(0, maxRequests - entry.count).toString(),
    'X-RateLimit-Reset': Math.ceil(entry.resetTime / 1000).toString(),
  };
}

// Helper to get client identifier from request
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from Vercel/CF headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const realIp = request.headers.get('x-real-ip');

  const ip = forwardedFor?.split(',')[0] || cfConnectingIp || realIp || 'unknown';

  // Add user agent to distinguish different browsers on same network
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Create a simple hash for identification
  return `${ip}-${userAgent.slice(0, 50)}`;
}
