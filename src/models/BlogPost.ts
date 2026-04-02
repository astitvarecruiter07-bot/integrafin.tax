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
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug.'],
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt/description.'],
    },
    category: {
      type: String,
      default: 'General',
    },
    contentHtml: {
      type: String,
      required: [true, 'Please provide content.'],
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
    },
    author: {
      name: {
        type: String,
        default: 'IntegraFin LLC',
      },
      image: {
        type: String,
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
