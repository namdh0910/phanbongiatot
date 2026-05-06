import dbConnect from './src/lib/db';
import Blog from './src/lib/models/Blog';
import mongoose from 'mongoose';

async function checkBlogs() {
  await dbConnect();
  const blogs = await Blog.find({});
  console.log('Total blogs:', blogs.length);
  blogs.forEach(b => {
    console.log(`- Title: ${b.title}`);
    console.log(`  Slug: ${b.slug}`);
  });
  mongoose.connection.close();
}

checkBlogs();
