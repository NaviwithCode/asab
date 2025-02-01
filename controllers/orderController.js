import orderModel from "../models/orderModel.js";
import userModels from "../models/userModels.js";

// Placing Orders Usign COD Method
const placeOrder = async (req, res) => {
  try {
    const {items, amount, shippingAddress } = req.body;
    let userId = req.user;

    const orderData = {
      userId,
      amount,
    //   address,
    shippingAddress,
      items,
      // products,
      // paymentMethod,
      paymentMethod: "COD",
      payment: "false",
    //   date: Date.now,
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModels.findByIdAndUpdate(userId);
    res.status(201).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Placing Orders Usign Brainteen Method
const placeOrderBrainteen = async (req, res) => {};
// All Orders Data for admin panel
const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
//   try {
//     const orders = await orderModel.find({})
//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error WHile Geting Orders",
//       error,
//     });
// };
}
// All Orders Data for forntend
const userOrder = async (req, res) => {
  try {
    // const {userId} = req.body
    const orders = await orderModel.find({userId:req.user})
    res.json({success:true,orders})
    // const {userId} = req.body
    // const orders = await orderModel.find({userId:req.user})
    // let orders = await orderModel.find({userId:req.user})
    // res.status(200).json(orders);
  //   let userId = req.user._id.toString();
  // // console.log(userId)
  // let orders = await orderModel.find({ userId: userId }).sort({ orderDate :-1});
  // res.json(orders)
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// All Orders Data for forntend
const updateStatus = async (req, res) => {
  try {
    const {orderId,status} =req.body
    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success:true,message:"Order Status Updated Successfully"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};


export { placeOrder, placeOrderBrainteen, allOrder, userOrder, updateStatus };
