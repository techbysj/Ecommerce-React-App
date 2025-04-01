const uploadProductPermission = require("../../helpers/permission");
const Product = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      return res
        .status(403)
        .json({ message: "Permission denied", error: true, success: false });
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
