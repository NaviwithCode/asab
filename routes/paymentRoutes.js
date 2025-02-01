import express from 'express'
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { CreateOrderController } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create',requireSignIn,CreateOrderController)
export default router