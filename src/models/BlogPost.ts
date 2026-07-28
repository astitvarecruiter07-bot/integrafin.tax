import mongoose from 'mongoose';

export interface IBlogPost extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  contentHtml: string;
  date: string;
  readTime: string;
  featured: boolean;
  image?: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new mongoose.Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title.'],
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug.'],
      unique: true,
      index: true,
      trim: true,
      maxlength: 120,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt/description.'],
      maxlength: 500,
    },
    category: {
      type: String,
      default: 'General',
      maxlength: 80,
    },
    contentHtml: {
      type: String,
      required: [true, 'Please provide content.'],
      maxlength: 500_000,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      maxlength: 2000,
    },
    author: {
      name: {
        type: String,
        default: 'IntegraFin LLC',
        maxlength: 120,
      },
      image: {
        type: String,
        maxlength: 2000,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Prevent re-compilation of the model
export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
