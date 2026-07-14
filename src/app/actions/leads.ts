'use server';

import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import ContactLead from '@/models/ContactLead';
import { requireAdminAuth } from '@/lib/adminAuth';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rateLimit';

const LeadSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is too short').max(20),
  company: z.string().max(100).optional(),
  service: z.string().min(2, 'Please select a service'),
  message: z.string().min(10, 'Message is too short').max(2000),
  source: z.string().max(100).default('contact-page'),
  revenue: z.string().max(100).optional(),
  jurisdiction: z.string().max(100).optional(),
  attribution: z.object({
    firstLandingPage: z.string().max(500).startsWith('/').optional(),
    currentSubmissionPage: z.string().max(500).startsWith('/').optional(),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    utmTerm: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    gbraid: z.string().max(200).optional(),
    wbraid: z.string().max(200).optional(),
    msclkid: z.string().max(200).optional(),
    firstTouchAt: z.string().datetime({ offset: true }).optional(),
  }).optional(),
});

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().max(100).default('newsletter'),
  attribution: LeadSchema.shape.attribution,
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type NewsletterInput = z.infer<typeof NewsletterSchema>;

const LEAD_LIMIT = 5;
const LEAD_WINDOW_MS = 10 * 60 * 1000;

function sanitizeAttributionPath(value: string | undefined) {
  if (!value) return undefined;
  const path = value.trim().split(/[?#]/, 1)[0];
  return path.startsWith('/') && !path.startsWith('//') ? path : undefined;
}

function sanitizeAttributionReferrer(value: string | undefined) {
  if (!value) return undefined;

  try {
    const referrer = new URL(value);
    return `${referrer.origin}${referrer.pathname}`;
  } catch {
    return sanitizeAttributionPath(value);
  }
}

function prepareAttribution(
  attribution: LeadInput['attribution'] | NewsletterInput['attribution'],
  submittedAt: Date,
) {
  return {
    firstLandingPage: sanitizeAttributionPath(attribution?.firstLandingPage),
    currentSubmissionPage: sanitizeAttributionPath(attribution?.currentSubmissionPage),
    referrer: sanitizeAttributionReferrer(attribution?.referrer),
    utmSource: attribution?.utmSource,
    utmMedium: attribution?.utmMedium,
    utmCampaign: attribution?.utmCampaign,
    utmContent: attribution?.utmContent,
    utmTerm: attribution?.utmTerm,
    gclid: attribution?.gclid,
    gbraid: attribution?.gbraid,
    wbraid: attribution?.wbraid,
    msclkid: attribution?.msclkid,
    firstTouchAt: attribution?.firstTouchAt ? new Date(attribution.firstTouchAt) : undefined,
    submittedAt,
  };
}

async function getLeadRateLimitKey() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get('x-forwarded-for');
  const realIp = headerStore.get('x-real-ip');
  const firstForwarded = forwardedFor?.split(',')[0]?.trim();
  return firstForwarded || realIp || 'unknown';
}

export async function submitLead(data: LeadInput) {
  try {
    const rateLimitKey = await getLeadRateLimitKey();
    const rateResult = checkRateLimit(`submitLead:${rateLimitKey}`, LEAD_LIMIT, LEAD_WINDOW_MS);
    if (!rateResult.allowed) {
      return {
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.',
      };
    }

    const validatedData = LeadSchema.parse(data);
    
    await dbConnect();
    
    const submittedAt = new Date();
    const newLead = await ContactLead.create({
      ...validatedData,
      attribution: prepareAttribution(validatedData.attribution, submittedAt),
      status: 'new',
      createdAt: submittedAt,
    });
    
    return {
      success: true,
      message: 'Thank you. Your request has been submitted for team follow-up.',
      leadId: newLead._id.toString(),
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }
    
    return {
      success: false,
      message: 'Processing failed. Please try again or call us directly at (832) 647-1819.',
    };
  }
}

export async function submitNewsletterSignup(data: NewsletterInput) {
  try {
    const rateLimitKey = await getLeadRateLimitKey();
    const rateResult = checkRateLimit(`newsletter:${rateLimitKey}`, LEAD_LIMIT, LEAD_WINDOW_MS);
    if (!rateResult.allowed) {
      return {
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.',
      };
    }

    const validatedData = NewsletterSchema.parse(data);

    await dbConnect();

    const emailPrefix = validatedData.email.split('@')[0] || 'Newsletter Subscriber';

    const submittedAt = new Date();
    await ContactLead.create({
      name: emailPrefix,
      email: validatedData.email,
      phone: 'Not provided',
      service: 'Newsletter Signup',
      message: 'Requested IntegraFin tax and accounting updates.',
      source: validatedData.source,
      attribution: prepareAttribution(validatedData.attribution, submittedAt),
      status: 'new',
      createdAt: submittedAt,
    });

    return {
      success: true,
      message: 'You are subscribed. We will send useful tax updates, not noise.',
    };
  } catch (error) {
    console.error('Newsletter signup error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    return {
      success: false,
      message: 'Signup failed. Please try again or email contact@integrafin.tax.',
    };
  }
}

export async function getLeads() {
  try {
    await requireAdminAuth();
    await dbConnect();
    const leads = await ContactLead.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(leads));
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}
