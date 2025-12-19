# Services Folder

## Why is this folder empty?

The `services` folder is currently empty because the Holy Ghost Power Anointed Church International website is a **static informational website** with no external API integrations or backend services at this stage.

## What is the services folder for?

The services folder is typically used for:

### 1. **API Client Functions**
- Functions to communicate with backend APIs
- Data fetching and mutation logic
- Request/response handling

### 2. **External Service Integrations**
- Payment processors (Stripe, PayPal, etc.)
- Email services (SendGrid, Mailgun, etc.)
- SMS services (Twilio, etc.)
- Analytics (Google Analytics, Mixpanel, etc.)

### 3. **Third-Party APIs**
- Social media integrations
- Map services (Google Maps, Mapbox)
- Weather APIs
- Content management systems

### 4. **Backend Communication**
- Supabase client functions
- REST API calls
- GraphQL queries
- WebSocket connections

## When would you need service files?

You would add service files when implementing features like:

### Contact Form Integration
```typescript
// src/services/emailService.ts
export async function sendContactForm(data: ContactFormData) {
  // Send email via SendGrid, Mailgun, etc.
}

export async function sendPrayerRequest(data: PrayerRequestData) {
  // Send prayer request to church email
}
```

### Payment Processing
```typescript
// src/services/paymentService.ts
export async function processDonation(amount: number, method: string) {
  // Process payment via Stripe, PayPal, etc.
}

export async function createPaymentIntent(amount: number) {
  // Create Stripe payment intent
}
```

### Newsletter Subscription
```typescript
// src/services/newsletterService.ts
export async function subscribeToNewsletter(email: string) {
  // Subscribe via Mailchimp, ConvertKit, etc.
}
```

### Analytics Tracking
```typescript
// src/services/analyticsService.ts
export function trackPageView(page: string) {
  // Track with Google Analytics, Plausible, etc.
}

export function trackEvent(event: string, data?: any) {
  // Track custom events
}
```

### Sermon Management
```typescript
// src/services/sermonService.ts
export async function fetchSermons() {
  // Fetch sermons from CMS or database
}

export async function getSermonById(id: string) {
  // Get specific sermon details
}
```

## Current Project Status

✅ **Static Website**: All content is hardcoded in the page components

✅ **No Backend**: No database or server-side logic required yet

✅ **No External APIs**: No third-party service integrations

✅ **Contact Form**: Currently client-side only (needs email service integration)

✅ **Donations**: Currently displays information only (needs payment processor)

## Next Steps to Add Services

### 1. Email Service Integration (Contact Form)

**Install dependencies:**
```bash
pnpm add @sendgrid/mail
# or
pnpm add nodemailer
```

**Create service:**
```typescript
// src/services/emailService.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
  isPrayerRequest: boolean;
}) {
  const msg = {
    to: 'info@hgpaci.org',
    from: 'noreply@hgpaci.org',
    subject: data.isPrayerRequest ? 'Prayer Request' : 'Contact Form Submission',
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    html: `<strong>Name:</strong> ${data.name}<br>
           <strong>Email:</strong> ${data.email}<br><br>
           <strong>Message:</strong><br>${data.message}`,
  };

  return await sgMail.send(msg);
}
```

### 2. Payment Integration (Donations)

**Install dependencies:**
```bash
pnpm add @stripe/stripe-js
```

**Create service:**
```typescript
// src/services/paymentService.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createDonation(amount: number, category: string) {
  const stripe = await stripePromise;
  
  // Call your backend to create payment intent
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, category }),
  });
  
  const { clientSecret } = await response.json();
  
  return { stripe, clientSecret };
}
```

### 3. CMS Integration (Sermons & Events)

**Install dependencies:**
```bash
pnpm add @supabase/supabase-js
# or use any CMS like Contentful, Sanity, etc.
```

**Create service:**
```typescript
// src/services/contentService.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function fetchSermons() {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
}
```

## Recommended Integrations for Church Website

### Priority 1: Essential
1. **Email Service** - For contact form and prayer requests
2. **Payment Processor** - For online donations and tithes

### Priority 2: Important
3. **CMS or Database** - For managing sermons, events, and announcements
4. **Analytics** - To track visitor engagement

### Priority 3: Nice to Have
5. **Newsletter Service** - For email campaigns
6. **Live Streaming** - For online services
7. **Calendar Integration** - For event management
8. **SMS Notifications** - For event reminders

## Example: Complete Email Service

Here's a complete example you can use:

```typescript
// src/services/emailService.ts

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  isPrayerRequest: boolean;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    // Option 1: Use a serverless function (recommended)
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    // Option 2: Use EmailJS (no backend needed)
    // const response = await emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   data,
    //   'YOUR_PUBLIC_KEY'
    // );

    return;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send your message. Please try again or contact us directly.');
  }
}

export async function subscribeToNewsletter(email: string): Promise<void> {
  try {
    const response = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Failed to subscribe. Please try again.');
  }
}
```

## Summary

The services folder is empty because:
- ✅ This is a static informational website
- ✅ No external APIs are currently integrated
- ✅ No backend services are needed at this stage

**The folder is ready for you to add service files when you're ready to integrate:**
- Email services for contact forms
- Payment processing for donations
- CMS for content management
- Analytics for tracking
- Any other third-party integrations

---

**Need help adding services?** Let me know which integration you'd like to implement first!