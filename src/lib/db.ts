import mongoose from 'mongoose';

const FALLBACK_URI = 'mongodb://namdh0910_db_user:Hoangnam0910@ac-bwcd881-shard-00-00.yshugrd.mongodb.net:27017,ac-bwcd881-shard-00-01.yshugrd.mongodb.net:27017,ac-bwcd881-shard-00-02.yshugrd.mongodb.net:27017/test?ssl=true&replicaSet=atlas-efz3q3-shard-0&authSource=admin&retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || FALLBACK_URI;

if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  console.warn('Warning: MONGODB_URI is not defined. Database features will not work.');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
