const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  status: String
}, { collection: 'products' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function listNemano() {
  await mongoose.connect('mongodb+srv://namdh0910:Nam091093@cluster0.p7p8n.mongodb.net/phanbongiatot?retryWrites=true&w=majority');
  const products = await Product.find({ name: /Nemano/i });
  console.log(JSON.stringify(products, null, 2));
  await mongoose.disconnect();
}

listNemano();
