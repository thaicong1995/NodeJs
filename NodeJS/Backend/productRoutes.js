const express = require('express');
const router = express.Router();
const Product = require('./Product');

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductCode: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy một sản phẩm theo ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Tạo một sản phẩm mới
router.post('/', async (req, res) => {
  const product = new Product({
    ProductCode: req.body.ProductCode,
    ProductName: req.body.ProductName,
    ProductDate: req.body.ProductDate, 
    ProductOriginPrice: req.body.ProductOriginPrice,
    Quantity: req.body.Quantity,
    ProductStoreCode: req.body.ProductStoreCode
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật một sản phẩm theo ID bằng phương thức PATCH
router.patch('/:id', getProduct, async (req, res) => {
  const product = res.product;

  try {
    if (req.body.ProductCode !== undefined) {
      product.ProductCode = req.body.ProductCode;
    }
    if (req.body.ProductName !== undefined) {
      product.ProductName = req.body.ProductName;
    }
    if (req.body.ProductData !== undefined) {
      product.ProductData = req.body.ProductData;
    }
    if (req.body.ProductOriginPrice !== undefined) {
      product.ProductOriginPrice = req.body.ProductOriginPrice;
    }
    if (req.body.Quantity !== undefined) {
      product.Quantity = req.body.Quantity;
    }
    if (req.body.ProductStoreCode !== undefined) {
      product.ProductStoreCode = req.body.ProductStoreCode;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//tim kiem 1 san pham
async function getProduct(req, res, next) {
    let product;
    try {
      product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.product = product;
    next();
  }

// Xóa một sản phẩm theo ID
router.delete('/:id', getProduct, async (req, res) => {
    try {
      // Kiểm tra nếu không tìm thấy sản phẩm
      if (!res.product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Xóa sản phẩm
      await res.product.deleteOne();
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Cập nhật một sản phẩm theo ID bằng phương thức PUT
  router.put('/:id', getProduct, async (req, res) => {
    const product = res.product;
  
    try {
      // Cập nhật thông tin sản phẩm
      product.ProductCode = req.body.ProductCode;
      product.ProductName = req.body.ProductName;
      product.ProductData = req.body.ProductData;
      product.ProductOriginPrice = req.body.ProductOriginPrice;
      product.Quantity = req.body.Quantity;
      product.ProductStoreCode = req.body.ProductStoreCode;
  
      // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
