'use server';

import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import ContactLead from '@/models/ContactLead';

const LeadSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is too short').max(20),
  company: z.string().max(100).optional(),
  service: z.string().min(2, 'Please select a service'),
  message: z.string().min(10, 'Message is too short').max(2000),
  source: z.string().default('contact-page'),
  revenue: z.string().optional(),
  jurisdiction: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export async function submitLead(data: LeadInput) {
  try {
    const validatedData = LeadSchema.parse(data);
    
    await dbConnect();
    
    console.log('📝 Saving Lead to DB:', validatedData);
    
    const newLead = await ContactLead.create({
      ...validatedData,
      status: 'new',
      createdAt: new Date(),
    });
    
    return {
      success: true,
      message: 'Thank you! Your request has been submitted successfully. A tax expert will contact you shortly.',
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

export async function getLeads() {
  try {
    await dbConnect();
    const leads = await ContactLead.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(leads));
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}
