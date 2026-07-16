import mongoose from 'mongoose';

export const LEAD_STATUSES = [
  'new',
  'contact_attempted',
  'contacted',
  'qualified',
  'appointment_booked',
  'proposal_sent',
  'client_won',
  'client_lost',
  'spam',
  'duplicate',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type StoredLeadStatus = LeadStatus | 'completed';

export interface ILeadAttribution {
  firstLandingPage?: string;
  currentSubmissionPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  firstTouchAt?: Date;
  submittedAt: Date;
}

export interface IContactLead extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: string;
  revenue?: string;
  jurisdiction?: string;
  attribution?: ILeadAttribution;
  status: StoredLeadStatus;
  estimatedValue?: number;
  actualRevenue?: number;
  reasonLost?: string;
  firstResponseAt?: Date;
  appointmentAt?: Date;
  statusUpdatedAt?: Date;
  internalNotes?: string;
  createdAt: Date;
}

const LeadAttributionSchema = new mongoose.Schema<ILeadAttribution>(
  {
    firstLandingPage: { type: String, maxlength: 500 },
    currentSubmissionPage: { type: String, maxlength: 500 },
    referrer: { type: String, maxlength: 500 },
    utmSource: { type: String, maxlength: 200 },
    utmMedium: { type: String, maxlength: 200 },
    utmCampaign: { type: String, maxlength: 200 },
    utmContent: { type: String, maxlength: 200 },
    utmTerm: { type: String, maxlength: 200 },
    gclid: { type: String, maxlength: 200 },
    gbraid: { type: String, maxlength: 200 },
    wbraid: { type: String, maxlength: 200 },
    msclkid: { type: String, maxlength: 200 },
    firstTouchAt: { type: Date },
    submittedAt: { type: Date, required: true },
  },
  { _id: false },
);

const ContactLeadSchema = new mongoose.Schema<IContactLead>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number.'],
    },
    company: {
      type: String,
      maxlength: [100, 'Company name cannot be more than 100 characters'],
    },
    service: {
      type: String,
      required: [true, 'Please specify the service.'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message.'],
    },
    source: {
      type: String,
      required: [true, 'Please provide the source page.'],
      default: 'contact-page',
    },
    revenue: {
      type: String,
    },
    jurisdiction: {
      type: String,
    },
    attribution: {
      type: LeadAttributionSchema,
    },
    status: {
      type: String,
      // `completed` remains readable for historical records but is not accepted by admin actions.
      enum: [...LEAD_STATUSES, 'completed'],
      default: 'new',
    },
    estimatedValue: {
      type: Number,
      min: 0,
      max: 1_000_000_000,
    },
    actualRevenue: {
      type: Number,
      min: 0,
      max: 1_000_000_000,
    },
    reasonLost: {
      type: String,
      maxlength: 1000,
    },
    firstResponseAt: {
      type: Date,
    },
    appointmentAt: {
      type: Date,
    },
    statusUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    internalNotes: {
      type: String,
      maxlength: 5000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const existingModel = mongoose.models.ContactLead as mongoose.Model<IContactLead> | undefined;

export default existingModel || mongoose.model<IContactLead>('ContactLead', ContactLeadSchema);
