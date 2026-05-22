'use server';

import dbConnect from '@/lib/mongodb';
import ContactLead from '@/models/ContactLead';
import { requireAdminAuth } from '@/lib/adminAuth';

/**
 * Server Action to test the database connection
 */
export async function testDbConnection() {
  try {
    await requireAdminAuth();
    await dbConnect();

    const leadCount = await ContactLead.countDocuments();

    return {
      success: true,
      message: `Successfully connected to MongoDB Atlas. Current lead count: ${leadCount}`,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Failed to connect to MongoDB: ${message}`,
    };
  }
}
