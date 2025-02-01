// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {  
//               type: String,  
//               required: true,  
//               // trim: true  
//           },
// //     customerName: {  
// //       type: String,  
// //       required: true,  
// //       trim: true  
// //   },  
// //   customerEmail: {  
// //       type: String,  
// //       required: true,  
// //       trim: true  
// //   },  
//   address: {  
//       type: Object,  
//       required: true  
//   },  
//   orderItems: [  
//       {  
//           products: {  
//               type: String,  
//               ref: 'Product',  
//             //   required: true  
//           },  
//           quantity: {  
//               type: Number,  
//               required: true  
//           }  
//       }  
//   ],  
// //   paymentMethod: {  
// //       type: String,  
// //       enum: ['Cash on Delivery'],  
// //       default: 'Cash on Delivery'  
// //   }, 
// paymentMethod: {  
//     type: String,  
//     enum: ['Cash on Delivery', 'Credit Card', 'Debit Card'],  
//     default: 'Cash on Delivery'  
// }, 
//   amount: {  
//       type: String,  
//       required: true  
//   },  
//   orderStatus: {  
//       type: String,  
//       enum: ['Pending', 'Completed', 'Cancelled'],  
//       default: 'Pending'  
//   },  
//   createdAt: {  
//       type: Date,  
//       default: Date.now  
//   }   
//   },
// );

// export default mongoose.model("CreateOrder", orderSchema);
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         type: mongoose.ObjectId,
//         ref: "Products",
//       },
//     ],
//     amount: {  
//             type: String,  
//             required: true  
//         },
//     // address: {  
//     //         type: String,  
//     //         required: true  
//     //     }, 
//     payment: {},
//     buyer: {
//       type: mongoose.ObjectId,
//       ref: "users",
//     },
//     status: {
//       type: String,
//       default: "Not Process",
//       enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
//     },

// //         orderid: {
// //           type: String,
// //           required: true,
// //           unique: [true,"already in database"],
// //         },
// //         shipping_first_name: {
// //           type: String,
// //           required: true,
// //         },
// //         // shipping_last_name: {
// //         //   type: String,
// //         //   required: true,
// //         // },
// //         shipping_country: {
// //           type: String,
// //           required: true,
// //         },
// //         shipping_state: {
// //           type: String,
// //           required: true,
// //         },
// //         shipping_city: {
// //           type: String,
// //           required: true,
// //         },
// //         shipping_pincode: {
// //           type: String,
// //           required: true,
// //         },
// //         shipping_address1: {
// //           type: String,
// //           required: true,
// //         },
// //         // shipping_address2: {
// //         //   type: String,
// //         //   required: true,
// //         // },
// //         // shipping_email: {
// //         //   type: String,
// //         //   required: [true,"email is Required"],
// //         // },
// //         shipping_mobile: {
// //           type: String,
// //           required: [true,"mobile is Required"],
// //         },
// //         payment_key: {
// //             type: String,
// //             default: null,
// //           },
// //           order_date: {
// //             type: Date,
// //             default: Date.now,
// //           },
// //           order_status: {
// //             type: String,
// //             enum: ['pending', 'processing', 'shipped', 'delivered'],
// //             default: 'pending',
// //           },
// //           payment_status: {
// //             type: String,
// //             enum: ['pending', 'received'],
// //             default: 'pending',
// //           },
// //           payment_method: {
// //             type: String,
// //             enum: ['COD', 'Online'],
// //             default: 'COD',
// //           },
// //           user_id: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref:'Usertable'
// //           }
// },
//   { timestamps: true }
// );

// export default mongoose.model("CreateOrder", orderSchema);

// import mongoose from "mongoose";
import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId:{type:String, required:true},
  items:{type:Array, required:true},
  // products: [
  //         {
  //           type: Array,
  //           // type: mongoose.ObjectId,
  //           // ref: "Products",
  //           required:true,
  //         },
  //       ],
//   items: [  
//             {  
//                 products: {  
//                   type: mongoose.ObjectId,
//                     ref: 'Product',  
//                     required: true  
//                 },   
//             }  
//         ],  
  amount:{type:String, required:true},
  shippingAddress:{type:Object, required:true},
  status:{type:String, required:true,default:'Order Placed'},
  paymentMethod:{type:String, required:true },
  payment:{type:Boolean, required:true, default:'false' },
  createdAt: { type: Date, default: Date.now },
})

const orderModel = mongoose.models.order || mongoose.model('createorders', orderSchema)
export default orderModel;

// import mongoose from "mongoose";  

// Define the order schema
// const orderSchema = new mongoose.Schema({  
//     userId: {  
//         type: String,  
//         required: true,  
//         // trim: true  
//     },  
//     // customerPhone: {  
//     //   type: String,
//     //   required: [true,"mobile is Required"], 
//     // },  
//     customerAddress: {  
//         type: String,  
//         required: true  
//     },  
//     orderItems: [  
//         {  
//             products: {  
//               type: Array,
//                 ref: 'Product',  
//                 // required: true  
//             },   
//         }  
//     ],  
//     amount: {  
//         type: String,  
//         required: true  
//     },  
//     paymentMethod: {  
//         type: String,  
//         enum: ['Cash on Delivery', 'Credit Card', 'Debit Card', 'UPI'],  
//         default: 'Cash on Delivery'  
//     },  
//     // orderStatus: {  
//     //     type: String,  
//     //     enum: ['Pending', 'Completed', 'Cancelled'],  
//     //     default: 'Pending'  
//     // },  
//     createdAt: {  
//         type: Date,  
//         default: Date.now  
//     }  
// });  

// // Export the Order modele
// const orderModel = mongoose.models.order || mongoose.model('createorders', orderSchema)
// export default orderModel;  
