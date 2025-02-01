// import { error } from "console"
import ProductsModels from "../models/ProductsModels.js";
import CategoryModels from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
// import OrderModel from "../models/OrderModel.js";
// import dotenv from "dotenv";
// payment getway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
// import OrderModel from "../models/OrderModel.js";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
// products create
export const CreateProductsController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.sttatus(500).send({ error: "name is required" });
      case !description:
        return res.sttatus(500).send({ error: "Description is required" });
      case !price:
        return res.sttatus(500).send({ error: "price is required" });
      case !category:
        return res.sttatus(500).send({ error: "category is required" });
      case !quantity:
        return res.sttatus(500).send({ error: "quantity is required" });
      // case !shipping:
      //     return res.sttatus(500).send({error:"shipping is required"})
      case !photo && photo.size > 1000000:
        return res
          .sttatus(500)
          .send({ error: "photo is required and should be less then 1mb" });
    }
    const products = new ProductsModels({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      Message: "products Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};
// products get all
export const GetProductsController = async (req, res) => {
  try {
    const products = await ProductsModels.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products Get",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Products",
      error,
    });
  }
};
// get single product
export const GetSingleProductsController = async (req, res) => {
  try {
    const products = await ProductsModels.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Products Fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Single Products",
      error,
    });
  }
};
// get product photo
export const GetProductsPhotoController = async (req, res) => {
  try {
    const products = await ProductsModels.findById(req.params.pid).select(
      "photo"
    );
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Products Photo",
      error,
    });
  }
};
// get product photo
export const DeleteProductsController = async (req, res) => {
  try {
    await ProductsModels.findByIdAndDelete(req.params.pid).select("photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Products ",
      error,
    });
  }
};
// get product photo
export const UpdateProductsController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.sttatus(500).send({ error: "name is required" });
      case !description:
        return res.sttatus(500).send({ error: "Description is required" });
      case !price:
        return res.sttatus(500).send({ error: "price is required" });
      case !category:
        return res.sttatus(500).send({ error: "category is required" });
      case !quantity:
        return res.sttatus(500).send({ error: "quantity is required" });
      // case !shipping:
      //     return res.sttatus(500).send({error:"shipping is required"})
      case photo && photo.size > 1000000:
        return res
          .sttatus(500)
          .send({ error: "photo is required and should be less then 1mb" });
    }
    const products = await ProductsModels.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      Message: "products Update Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update product",
    });
  }
};
// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductsModels.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
// product count
export const productCountController = async (req, res) => {
  try {
    const total = await ProductsModels.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductsModels.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductsModels.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductsModels.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModels.findOne({ slug: req.params.slug });
    const products = await ProductsModels.find({ category }).populate(
      "category"
    );
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// //payment gateway api

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//token
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
            // address,
            // // userId,
            // // orderId: order.id,
            // amount,
            // payStatus: "created",
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// export const checkout = async (req, res) => {
//   const { amount, cartItems, userShipping, userId } = req.body;

//   var options = {
//     amount: amount * 100, // amount in the smallest currency unit
//     currency: "AED",
//     receipt: `receipt_${Date.now()}`,
//   };

//   const order = await braintree.orders.create(options);

//   res.json({
//     orderId: order.id,
//     amount: amount,
//     cartItems,
//     userShipping,
//     userId,
//     payStatus: "created",
//   });
// };
