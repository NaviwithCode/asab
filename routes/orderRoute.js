import express from 'express'
import { allOrder, placeOrder, placeOrderBrainteen, updateStatus, userOrder } from '../controllers/orderController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',allOrder)
orderRouter.post('/status',updateStatus)

// payment Features
orderRouter.post('/place',requireSignIn,placeOrder)
orderRouter.post('/braintree',requireSignIn,placeOrderBrainteen)

// user Features
orderRouter.post('/userorder',requireSignIn,userOrder)
// orderRouter.get('/:id',requireSignIn,userOrderId)

export default orderRouter