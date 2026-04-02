import dbConnect from './src/lib/mongodb';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkConnection() {
  try {
    console.log('--- Database Connection Check ---');
    console.log('URI found:', process.env.MONGODB_URI ? 'Yes' : 'No');
    
    await dbConnect();
    console.log('Status:', mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌');
    
    if (mongoose.connection.readyState === 1) {
      console.log('Database Name:', mongoose.connection.name);
    }
    
    process.exit(0);
  } catch (error: any) {
    console.error('Connection Error ❌:', error.message);
    process.exit(1);
  }
}

checkConnection();
