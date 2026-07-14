import mongoose from 'mongoose';

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
  status: 'new' | 'contacted' | 'completed';
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
      enum: ['new', 'contacted', 'completed'],
      default: 'new',
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
