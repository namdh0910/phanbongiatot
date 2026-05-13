import dbConnect from './src/lib/db';
import CommunityQuestion from './src/lib/models/CommunityQuestion';

async function approveAll() {
  await dbConnect();
  const result = await CommunityQuestion.updateMany(
    { status: 'pending' },
    { status: 'approved' }
  );
  console.log(`Updated ${result.modifiedCount} questions to approved.`);
  process.exit(0);
}

approveAll();
