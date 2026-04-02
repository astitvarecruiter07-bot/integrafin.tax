import mongoose from 'mongoose';

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
  status: 'new' | 'contacted' | 'completed';
  createdAt: Date;
}

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
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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

if (mongoose.models.ContactLead) {
  delete (mongoose.models as any).ContactLead;
}

export default mongoose.model<IContactLead>('ContactLead', ContactLeadSchema);
