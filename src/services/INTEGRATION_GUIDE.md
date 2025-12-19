# Integration Guide for Church Website

## Quick Start: Adding Services

This guide will help you integrate external services into your church website.

---

## 1. Email Integration (Contact Form)

### Option A: EmailJS (Easiest - No Backend Required)

**Step 1: Install EmailJS**
```bash
pnpm add @emailjs/browser
```

**Step 2: Sign up at [EmailJS](https://www.emailjs.com/)**
- Create an account
- Add an email service (Gmail, Outlook, etc.)
- Create an email template
- Get your Public Key, Service ID, and Template ID

**Step 3: Create Email Service**
```typescript
// src/services/emailService.ts
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  isPrayerRequest: boolean;
}) {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        message: data.message,
        request_type: data.isPrayerRequest ? 'Prayer Request' : 'General Inquiry',
      },
      PUBLIC_KEY
    );
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send message');
  }
}
```

**Step 4: Update Contact Page**
```typescript
// In src/pages/ContactPage.tsx
import { sendContactEmail } from '@/services/emailService';

const onSubmit = async (data: ContactFormData) => {
  try {
    await sendContactEmail(data);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    form.reset();
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message. Please try again.",
      variant: "destructive",
    });
  }
};
```

**Step 5: Add Environment Variables**
```env
# .env.local
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

---

## 2. Payment Integration (Donations)

### Option A: Stripe (Recommended)

**Step 1: Install Stripe**
```bash
pnpm add @stripe/stripe-js
```

**Step 2: Sign up at [Stripe](https://stripe.com/)**
- Create an account
- Get your Publishable Key from Dashboard

**Step 3: Create Payment Service**
```typescript
// src/services/paymentService.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(
  amount: number,
  category: string
) {
  const stripe = await stripePromise;
  
  // You'll need a backend endpoint to create the session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, category }),
  });
  
  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  });
  
  if (result?.error) {
    throw new Error(result.error.message);
  }
}
```

**Step 4: Update Give Page**
```typescript
// In src/pages/GivePage.tsx
import { createCheckoutSession } from '@/services/paymentService';

const handleDonation = async (amount: number, category: string) => {
  try {
    await createCheckoutSession(amount, category);
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to process donation. Please try again.",
      variant: "destructive",
    });
  }
};
```

### Option B: PayPal (Alternative)

**Step 1: Install PayPal**
```bash
pnpm add @paypal/react-paypal-js
```

**Step 2: Create PayPal Service**
```typescript
// src/services/paypalService.ts
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

export function getPayPalOptions() {
  return {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };
}
```

---

## 3. Content Management (Sermons & Events)

### Option A: Supabase (Recommended for Dynamic Content)

**Step 1: Install Supabase**
```bash
pnpm add @supabase/supabase-js
```

**Step 2: Create Supabase Project**
- Sign up at [Supabase](https://supabase.com/)
- Create a new project
- Get your URL and Anon Key

**Step 3: Create Supabase Client**
```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Step 4: Create Content Service**
```typescript
// src/services/contentService.ts
import { supabase } from './supabase';

export async function fetchSermons() {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data;
}

export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function addPrayerRequest(request: {
  name: string;
  email: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from('prayer_requests')
    .insert([request]);
  
  if (error) throw error;
  return data;
}
```

**Step 5: Create Database Tables**
```sql
-- Sermons table
CREATE TABLE sermons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  series TEXT,
  scripture TEXT,
  audio_url TEXT,
  video_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  location TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Prayer Requests table
CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4. Analytics Integration

### Option A: Google Analytics

**Step 1: Install GA4**
```bash
pnpm add react-ga4
```

**Step 2: Create Analytics Service**
```typescript
// src/services/analyticsService.ts
import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export function initializeAnalytics() {
  ReactGA.initialize(TRACKING_ID);
}

export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path });
}

export function trackEvent(category: string, action: string, label?: string) {
  ReactGA.event({
    category,
    action,
    label,
  });
}
```

**Step 3: Add to App.tsx**
```typescript
// In src/App.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAnalytics, trackPageView } from '@/services/analyticsService';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    initializeAnalytics();
  }, []);
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  // ... rest of your app
}
```

---

## 5. Newsletter Integration

### Option A: Mailchimp

**Step 1: Install Mailchimp**
```bash
pnpm add @mailchimp/mailchimp_marketing
```

**Step 2: Create Newsletter Service**
```typescript
// src/services/newsletterService.ts
export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) throw new Error('Subscription failed');
    
    return { success: true };
  } catch (error) {
    console.error('Newsletter error:', error);
    throw new Error('Failed to subscribe');
  }
}
```

---

## Environment Variables Template

Create a `.env.local` file in your project root:

```env
# Email Service (EmailJS)
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id

# Payment (Stripe)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key

# Payment (PayPal)
VITE_PAYPAL_CLIENT_ID=your_client_id

# Database (Supabase)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Analytics (Google Analytics)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Newsletter (Mailchimp)
VITE_MAILCHIMP_API_KEY=your_api_key
VITE_MAILCHIMP_LIST_ID=your_list_id
```

---

## Recommended Implementation Order

1. **Email Service** (Contact Form) - Essential for communication
2. **Analytics** - Track visitor engagement
3. **Payment Processing** - Enable online donations
4. **Content Management** - Dynamic sermons and events
5. **Newsletter** - Build your email list

---

## Need Help?

Each service has detailed documentation:
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Stripe Docs](https://stripe.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Google Analytics Docs](https://developers.google.com/analytics)

---

**Ready to integrate?** Start with the email service for your contact form!