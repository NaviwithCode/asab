// import mongoose from "mongoose";
// const orderSchema = new mongoose.Schema({  
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         require: true,
//       },
//       fullName: { type: String, require: true },
//       address: { type: String, require: true },
//       city: { type: String, require: true },
//       state: { type: String, require: true },
//       country: { type: String, require: true },
//       pincode: { type: String, require: true }, 
//       phoneNumber: { type: String, require: true },
//     //   createdAt: { type: Date, default: Date.now },  
//     orderItems: [  
//         {  
//             productId: {  
//                 type: mongoose.Schema.Types.ObjectId,  
//                 ref: 'Product',  
//                 required: true  
//             },  
//             quantity: {  
//                 type: Number,  
//                 required: true  
//             }  
//         }  
//     ],  
//     totalAmount: {  
//         type: Number,  
//         required: true  
//     },  
//     paymentMethod: {  
//         type: String,  
//         enum: ['Cash on Delivery'],  
//         default: 'Cash on Delivery'  
//     },  
//     orderStatus: {  
//         type: String,  
//         enum: ['Pending', 'Completed', 'Cancelled'],  
//         default: 'Pending'  
//     },  
//     orderDate: {  
//         type: Date,  
//         default: Date.now  
//     }  
// });  

// // Export the Order model
// module.exports = mongoose.model('Order', orderSchema);  