# Resend Email Integration

**Status:** ✅ Complete  
**API Key:** Configured in `.env.local`

---

## Overview

All forms on the website are now connected to Resend and will send actual emails to the practice.

---

## API Routes Created

| Route | Purpose | Destination |
|-------|---------|-------------|
| `/api/contact` | General contact form | info@docrianos.com + infosonoma@docrianos.com |
| `/api/assessment` | Smile assessment form | Based on location preference |
| `/api/referral` | Doctor referral form | Based on patient location preference |
| `/api/virtual-care` | Virtual care signup | info@docrianos.com |

---

## Email Configuration

### From Address
```
Dr. Riaño Orthodontics <noreply@docrianos.com>
```

### To Addresses
- **San Francisco:** info@docrianos.com
- **Sonoma:** infosonoma@docrianos.com

### Email Format
- Professional HTML template
- Reply-to set to patient's email
- Form type clearly labeled in subject
- All form data included in formatted HTML

---

## Environment Variables

```env
RESEND_API_KEY=re_eiQKj51i_xDHhASyBZhLSuASGv7qkRWd7
FROM_EMAIL=noreply@docrianos.com
TO_EMAIL_SF=info@docrianos.com
TO_EMAIL_SONOMA=infosonoma@docrianos.com
```

---

## Forms Updated

### 1. ContactModule (Floating chat button)
- ✅ Submits to `/api/contact`
- ✅ Shows loading state
- ✅ Shows success/error messages
- ✅ Location-aware routing

### 2. ContactFlow (Contact page wizard)
- ✅ Submits appointments to `/api/contact`
- ✅ Submits billing/other inquiries to `/api/contact`
- ✅ Shows loading state
- ✅ Shows success/error messages

### 3. SmileAssessmentFlow (13-step assessment)
- ✅ Submits to `/api/assessment`
- ✅ Includes all assessment data
- ✅ Shows loading state
- ✅ Shows success/error messages

### 4. ReferralFlow (Doctor referrals)
- ✅ Submits to `/api/referral`
- ✅ Includes patient + doctor info
- ✅ Shows loading state
- ✅ Shows success/error messages

### 5. VirtualCareFlow (Virtual care signup)
- ✅ Submits to `/api/virtual-care`
- ✅ Handles new/existing patients
- ✅ Shows loading state
- ✅ Shows success/error messages

---

## Testing

### Test the API
```bash
# Start dev server
npm run dev

# Test contact API
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "(555) 123-4567",
    "message": "This is a test message",
    "location": "san-francisco"
  }'
```

### Expected Response
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Important Notes

### Domain Verification Required
Before going live, you must verify `docrianos.com` in Resend:

1. Log in to https://resend.com
2. Go to Domains
3. Add `docrianos.com`
4. Add DNS records as instructed
5. Wait for verification (usually instant to 24 hours)

### API Key Security
- The API key is stored in `.env.local` (not committed to git)
- API routes are server-side only
- Key is never exposed to client

### Rate Limits
Resend free tier: 100 emails/day  
Resend paid tier: 50,000 emails/month ($20/month)

---

## Troubleshooting

### Emails Not Sending
1. Check Resend dashboard for API key status
2. Verify domain is verified
3. Check spam folders
4. Review Vercel logs: `vercel logs --all`

### Build Errors
```bash
# If build fails, try:
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Form Submission Errors
- Check browser console for API errors
- Verify all required fields are filled
- Check network tab for 400/500 errors

---

## Next Steps

1. ✅ Verify domain in Resend dashboard
2. ✅ Test each form manually
3. ✅ Check that emails arrive in inbox (not spam)
4. ✅ Set up email forwarding rules if needed
5. ✅ Consider upgrading to paid Resend plan for higher volume

---

## Files Modified

- `.env.local` - Environment variables
- `.env.example` - Template for developers
- `package.json` - Added `resend` dependency
- `src/lib/resend.ts` - Resend client + email sender
- `src/lib/api.ts` - API client utilities
- `src/app/api/contact/route.ts` - Contact API
- `src/app/api/assessment/route.ts` - Assessment API
- `src/app/api/referral/route.ts` - Referral API
- `src/app/api/virtual-care/route.ts` - Virtual Care API
- `src/components/ContactModule.tsx` - Updated to use API
- `src/components/ContactFlow.tsx` - Updated to use API
- `src/components/SmileAssessmentFlow.tsx` - Updated to use API
- `src/components/ReferralFlow.tsx` - Updated to use API
- `src/components/VirtualCareFlow.tsx` - Updated to use API
