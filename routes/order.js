import express from 'express'
import { allOrders, placeOrders, updateStatus, userOrders } from '../controllers/orderControllers'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares'
const router = express.Router()

// admin Fea
router.post('/list',isAdmin,allOrders)
router.post('/status',isAdmin,updateStatus)

router.post('/place', requireSignIn,placeOrders)
// router.post('/place', requireSignIn,placeOrdersController)
router.post('/userorders', requireSignIn,userOrders)
export default router;