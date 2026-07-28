import mongoose from 'mongoose';

export const LEAD_STATUSES = [
  'new',
  'contact_attempted',
  'contacted',
  'qualified',
  'unqualified',
  'appointment_booked',
  'proposal_sent',
  'client_won',
  'client_lost',
  'spam',
  'duplicate',
] as const;

export const CALL_OUTCOMES = [
  'answered',
  'no_answer',
  'voicemail',
  'wrong_number',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type StoredLeadStatus = LeadStatus | 'completed';
export type CallOutcome = (typeof CALL_OUTCOMES)[number];
export type LeadNotificationStatus = 'pending' | 'sent' | 'not_configured' | 'delivery_failed';
export type LeadConfirmationStatus = LeadNotificationStatus | 'not_applicable';
export type AppointmentStatus = 'scheduled' | 'canceled';
export type AppointmentSource = 'calendly' | 'manual';

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

export interface ICallActivity {
  outcome: CallOutcome;
  notes?: string;
  calledAt: Date;
  nextFollowUpAt?: Date;
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
  appointmentStatus?: AppointmentStatus;
  appointmentSource?: AppointmentSource;
  appointmentCanceledAt?: Date;
  calendlyInviteeUri?: string;
  calendlyEventUri?: string;
  calendlyEventName?: string;
  calendlyLastWebhookAt?: Date;
  statusUpdatedAt?: Date;
  internalNotes?: string;
  callActivities?: ICallActivity[];
  callAttemptCount?: number;
  lastCallAt?: Date;
  lastCallOutcome?: CallOutcome;
  nextFollowUpAt?: Date;
  notificationStatus?: LeadNotificationStatus;
  notificationCheckedAt?: Date;
  notificationSentAt?: Date;
  confirmationEmailStatus?: LeadConfirmationStatus;
  confirmationEmailCheckedAt?: Date;
  confirmationEmailSentAt?: Date;
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

const CallActivitySchema = new mongoose.Schema<ICallActivity>(
  {
    outcome: {
      type: String,
      enum: CALL_OUTCOMES,
      required: true,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    calledAt: {
      type: Date,
      required: true,
    },
    nextFollowUpAt: {
      type: Date,
    },
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
      default: '',
      maxlength: 254,
      validate: {
        validator: (value: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please fill a valid email address',
      },
    },
    phone: {
      type: String,
      default: '',
      maxlength: 30,
    },
    company: {
      type: String,
      maxlength: [100, 'Company name cannot be more than 100 characters'],
    },
    service: {
      type: String,
      required: [true, 'Please specify the service.'],
      maxlength: 200,
    },
    message: {
      type: String,
      default: '',
      maxlength: [2000, 'Message cannot be more than 2000 characters'],
    },
    source: {
      type: String,
      required: [true, 'Please provide the source page.'],
      default: 'contact-page',
      maxlength: 100,
    },
    revenue: {
      type: String,
      maxlength: 100,
    },
    jurisdiction: {
      type: String,
      maxlength: 100,
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
    appointmentStatus: {
      type: String,
      enum: ['scheduled', 'canceled'],
    },
    appointmentSource: {
      type: String,
      enum: ['calendly', 'manual'],
    },
    appointmentCanceledAt: {
      type: Date,
    },
    calendlyInviteeUri: {
      type: String,
      maxlength: 600,
    },
    calendlyEventUri: {
      type: String,
      maxlength: 600,
    },
    calendlyEventName: {
      type: String,
      maxlength: 200,
    },
    calendlyLastWebhookAt: {
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
    callActivities: {
      type: [CallActivitySchema],
      default: [],
    },
    callAttemptCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    lastCallAt: {
      type: Date,
    },
    lastCallOutcome: {
      type: String,
      enum: CALL_OUTCOMES,
    },
    nextFollowUpAt: {
      type: Date,
    },
    notificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'not_configured', 'delivery_failed'],
      default: 'pending',
    },
    notificationCheckedAt: {
      type: Date,
    },
    notificationSentAt: {
      type: Date,
    },
    confirmationEmailStatus: {
      type: String,
      enum: ['pending', 'sent', 'not_configured', 'delivery_failed', 'not_applicable'],
      default: 'pending',
    },
    confirmationEmailCheckedAt: {
      type: Date,
    },
    confirmationEmailSentAt: {
      type: Date,
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

ContactLeadSchema.index(
  { calendlyInviteeUri: 1 },
  { unique: true, sparse: true, name: 'unique_calendly_invitee_uri' },
);
ContactLeadSchema.index({ nextFollowUpAt: 1 }, { name: 'lead_next_follow_up' });

const existingModel = mongoose.models.ContactLead as mongoose.Model<IContactLead> | undefined;

export default existingModel || mongoose.model<IContactLead>('ContactLead', ContactLeadSchema);
