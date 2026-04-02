'use server';

import dbConnect from '@/lib/mongodb';
import ContactLead from '@/models/ContactLead';

/**
 * Server Action to test the database connection
 */
export async function testDbConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    await dbConnect();
    
    // Attempt a simple operation: counting the number of leads
    const leadCount = await ContactLead.countDocuments();
    
    console.log(`✅ MongoDB Connection successful! Found ${leadCount} leads.`);
    
    return {
      success: true,
      message: `Successfully connected to MongoDB Atlas! Current lead count: ${leadCount}`,
    };
  } catch (error: any) {
    console.error('❌ MongoDB Connection failed:', error.message);
    return {
      success: false,
      message: `Failed to connect to MongoDB: ${error.message}`,
    };
  }
}

/**
 * Server Action to create a sample lead (uncomment to test writing)
 */
/*
export async function createSampleLead() {
  try {
    await dbConnect();
    const newLead = await ContactLead.create({
      name: 'Test Business',
      email: 'hello@test.com',
      service: 'Business Tax Preparation',
      message: 'This is a test submission from the integration setup.',
    });
    return { success: true, lead: JSON.parse(JSON.stringify(newLead)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
*/
