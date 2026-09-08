import mongoose from 'mongoose';
import { AI_REFERRAL_SOURCES, type AiReferralSource } from '@/lib/aiReferral';
import {
  complexityValues,
  deadlineTypeValues,
  deadlineWindowValues,
  financialAccountValues,
  mixedExpenseValues,
  monthlyTransactionValues,
  monthsBehindValues,
  payrollValues,
  reconciliationValues,
  softwareValues,
  type BookkeepingAssessmentRecord,
} from '@/lib/bookkeeping-cleanup/types';
import {
  cleanupContactPreferenceValues,
  cleanupMonthsBehindValues,
  cleanupNeedValues,
  cleanupSoftwareValues,
  type CleanupContactPreference,
  type CleanupMonthsBehind,
  type CleanupPrimaryNeed,
  type CleanupSoftware,
} from '@/lib/bookkeepingCleanupReview';

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

export const LEAD_RECORD_KINDS = [
  'sales_inquiry',
  'subscriber',
] as const;

export const LEAD_SERVICE_INTENTS = [
  'single_service',
  'cleanup_and_monthly',
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type StoredLeadStatus = LeadStatus | 'completed';
export type CallOutcome = (typeof CALL_OUTCOMES)[number];
export type LeadRecordKind = (typeof LEAD_RECORD_KINDS)[number];
export type LeadServiceIntent = (typeof LEAD_SERVICE_INTENTS)[number];
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
  fbclid?: string;
  aiReferralSource?: AiReferralSource;
  firstTouchAt?: Date;
  submittedAt: Date;
}

export interface IAttributionTouchSnapshot {
  landingPage: string;
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
  fbclid?: string;
  capturedAt: Date;
}

export interface ICampaignAttributionSnapshots {
  firstTouch: IAttributionTouchSnapshot;
  lastNonDirectTouch?: IAttributionTouchSnapshot;
  submissionTouch: IAttributionTouchSnapshot;
}

export interface IBookkeepingCleanupReviewRecord {
  primaryNeed: CleanupPrimaryNeed;
  monthsBehind: CleanupMonthsBehind;
  accountingSoftware?: CleanupSoftware;
  industry?: string;
  targetDate?: Date;
  contactPreference?: CleanupContactPreference;
  context?: string;
  consentToContact: true;
  formId: string;
  formVersion: string;
  offerId: string;
  pagePath: string;
  consentVersion: string;
  consentText: string;
  submittedAt: Date;
}

export interface ICallActivity {
  outcome: CallOutcome;
  notes?: string;
  calledAt: Date;
  nextFollowUpAt?: Date;
}

export interface IContactLead extends mongoose.Document {
  recordKind: LeadRecordKind;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  serviceIntent?: LeadServiceIntent;
  primaryService?: string;
  secondaryService?: string;
  message: string;
  source: string;
  revenue?: string;
  jurisdiction?: string;
  attribution?: ILeadAttribution;
  attributionSnapshots?: ICampaignAttributionSnapshots;
  submissionKey?: string;
  normalizedEmail?: string;
  normalizedPhone?: string;
  assignedOwner?: string;
  bookingCorrelationId?: string;
  leadEventId?: string;
  duplicateSubmissionCount?: number;
  bookkeepingAssessment?: BookkeepingAssessmentRecord;
  bookkeepingCleanupReview?: IBookkeepingCleanupReviewRecord;
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
    fbclid: { type: String, maxlength: 200 },
    aiReferralSource: { type: String, enum: AI_REFERRAL_SOURCES },
    firstTouchAt: { type: Date },
    submittedAt: { type: Date, required: true },
  },
  { _id: false },
);

const AttributionTouchSnapshotSchema = new mongoose.Schema<IAttributionTouchSnapshot>(
  {
    landingPage: { type: String, required: true, maxlength: 500 },
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
    fbclid: { type: String, maxlength: 200 },
    capturedAt: { type: Date, required: true },
  },
  { _id: false },
);

const CampaignAttributionSnapshotsSchema = new mongoose.Schema<ICampaignAttributionSnapshots>(
  {
    firstTouch: { type: AttributionTouchSnapshotSchema, required: true },
    lastNonDirectTouch: { type: AttributionTouchSnapshotSchema },
    submissionTouch: { type: AttributionTouchSnapshotSchema, required: true },
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

const BookkeepingAnswersSchema = new mongoose.Schema(
  {
    software: { type: String, enum: softwareValues, required: true },
    monthsBehind: { type: String, enum: monthsBehindValues, required: true },
    monthlyTransactions: { type: String, enum: monthlyTransactionValues, required: true },
    financialAccounts: { type: String, enum: financialAccountValues, required: true },
    reconciliationStatus: { type: String, enum: reconciliationValues, required: true },
    payrollStatus: { type: String, enum: payrollValues, required: true },
    mixedPersonalExpenses: { type: String, enum: mixedExpenseValues, required: true },
    complexities: [{ type: String, enum: complexityValues, required: true }],
    deadlineWindow: { type: String, enum: deadlineWindowValues, required: true },
    deadlineType: { type: String, enum: deadlineTypeValues },
  },
  { _id: false },
);

const BookkeepingFactorSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, maxlength: 100 },
    points: { type: Number, required: true, min: 0, max: 30 },
    explanationKey: { type: String, required: true, maxlength: 100 },
  },
  { _id: false },
);

const BookkeepingResultSchema = new mongoose.Schema(
  {
    calculatorVersion: { type: String, enum: ['1.0'], required: true },
    rawScore: { type: Number, required: true, min: 0, max: 113 },
    score: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, enum: ['reasonably_current', 'light_catch_up', 'moderate_cleanup', 'complex_cleanup'], required: true },
    urgency: { type: String, enum: ['normal', 'medium', 'high', 'critical'], required: true },
    factors: { type: [BookkeepingFactorSchema], default: [] },
    issueKeys: { type: [String], default: [] },
    checklistKeys: { type: [String], default: [] },
    recommendedServiceKeys: { type: [String], default: [] },
  },
  { _id: false },
);

const BookkeepingAssessmentSchema = new mongoose.Schema(
  {
    calculatorVersion: { type: String, enum: ['1.0'], required: true },
    answers: { type: BookkeepingAnswersSchema, required: true },
    result: { type: BookkeepingResultSchema, required: true },
    contactPreference: { type: String, enum: ['email', 'phone', 'no_preference'] },
    consentToContact: { type: Boolean, required: true, validate: (value: boolean) => value === true },
    completedAt: { type: Date, required: true },
    submittedAt: { type: Date, required: true },
  },
  { _id: false },
);

const BookkeepingCleanupReviewSchema = new mongoose.Schema<IBookkeepingCleanupReviewRecord>(
  {
    primaryNeed: { type: String, enum: cleanupNeedValues, required: true },
    monthsBehind: { type: String, enum: cleanupMonthsBehindValues, required: true },
    accountingSoftware: { type: String, enum: cleanupSoftwareValues },
    industry: { type: String, maxlength: 100 },
    targetDate: { type: Date },
    contactPreference: { type: String, enum: cleanupContactPreferenceValues },
    context: { type: String, maxlength: 800 },
    consentToContact: {
      type: Boolean,
      required: true,
      validate: (value: boolean) => value === true,
    },
    formId: { type: String, required: true, maxlength: 100 },
    formVersion: { type: String, required: true, maxlength: 40 },
    offerId: { type: String, required: true, maxlength: 100 },
    pagePath: { type: String, required: true, maxlength: 500 },
    consentVersion: { type: String, required: true, maxlength: 100 },
    consentText: { type: String, required: true, maxlength: 1000 },
    submittedAt: { type: Date, required: true },
  },
  { _id: false },
);

const ContactLeadSchema = new mongoose.Schema<IContactLead>(
  {
    recordKind: {
      type: String,
      enum: LEAD_RECORD_KINDS,
      default: 'sales_inquiry',
      required: true,
    },
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
    serviceIntent: {
      type: String,
      enum: LEAD_SERVICE_INTENTS,
      default: 'single_service',
    },
    primaryService: {
      type: String,
      maxlength: 200,
    },
    secondaryService: {
      type: String,
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
    attributionSnapshots: {
      type: CampaignAttributionSnapshotsSchema,
    },
    submissionKey: {
      type: String,
      maxlength: 100,
    },
    normalizedEmail: {
      type: String,
      maxlength: 254,
    },
    normalizedPhone: {
      type: String,
      maxlength: 30,
    },
    assignedOwner: {
      type: String,
      maxlength: 200,
    },
    bookingCorrelationId: {
      type: String,
      maxlength: 100,
    },
    leadEventId: {
      type: String,
      maxlength: 100,
    },
    duplicateSubmissionCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    bookkeepingAssessment: {
      type: BookkeepingAssessmentSchema,
    },
    bookkeepingCleanupReview: {
      type: BookkeepingCleanupReviewSchema,
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
ContactLeadSchema.index({ normalizedEmail: 1, status: 1 }, { name: 'lead_email_status' });
ContactLeadSchema.index({ normalizedPhone: 1, status: 1 }, { name: 'lead_phone_status' });
ContactLeadSchema.index(
  { bookingCorrelationId: 1 },
  { unique: true, sparse: true, name: 'unique_booking_correlation_id' },
);
ContactLeadSchema.index(
  { leadEventId: 1 },
  { unique: true, sparse: true, name: 'unique_lead_event_id' },
);
ContactLeadSchema.index(
  { source: 1, submissionKey: 1 },
  {
    unique: true,
    partialFilterExpression: { submissionKey: { $type: 'string' } },
    name: 'unique_lead_submission_key',
  },
);

const existingModel = mongoose.models.ContactLead as mongoose.Model<IContactLead> | undefined;

export default existingModel || mongoose.model<IContactLead>('ContactLead', ContactLeadSchema);
