// /routes/paymentRoutes.js
import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', createRazorpayOrder);
router.post('/verify', verifyRazorpayPayment);

export default router;
