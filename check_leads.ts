import 'dotenv/config';
import dbConnect from './src/lib/mongodb';
import ContactLead from './src/models/ContactLead';

async function check() {
  await dbConnect();
  const leads = await ContactLead.find({}).lean();
  console.log(JSON.stringify(leads, null, 2));
  process.exit(0);
}

check();
