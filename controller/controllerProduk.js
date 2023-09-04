const Product = require('../models/product');

exports.getAllPoduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({"message": 'Product found!', "data:": products});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const product = await Product.create({ name, price, category });
    res.status(201).json({"message": 'Product created!', "data:": product});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json({"message": 'Product found!', "data:": product});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    product.name = name;
    product.price = price;
    product.category = category;
    await product.save();
    res.json({"message": 'Product updated!', "data:": product});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
      const product = await Product.findByIdAndRemove(id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found!' });
      }
      res.json({ message: 'Product deleted!', deletedData: product });
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error });
  }
}