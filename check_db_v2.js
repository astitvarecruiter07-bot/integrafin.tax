const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
  }
  
  console.log('--- Database Connection Check (Native JS) ---');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully!');
    const db = client.db();
    console.log('Connected to Database:', db.databaseName);
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
}

check();
