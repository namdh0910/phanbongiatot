const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  status: String
}, { collection: 'products' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function listNemano() {
  const URI = 'mongodb://namdh0910_db_user:Hoangnam0910@ac-bwcd881-shard-00-00.yshugrd.mongodb.net:27017,ac-bwcd881-shard-00-01.yshugrd.mongodb.net:27017,ac-bwcd881-shard-00-02.yshugrd.mongodb.net:27017/phanbongiatot?ssl=true&replicaSet=atlas-efz3q3-shard-0&authSource=admin&retryWrites=true&w=majority';
  await mongoose.connect(URI);
  const products = await Product.find({ name: /Nemano/i });
  console.log(JSON.stringify(products, null, 2));
  await mongoose.disconnect();
}

listNemano();
