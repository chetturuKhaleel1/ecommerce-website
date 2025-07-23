import '../config/loadEnv.js';

import Razorpay from 'razorpay';
import crypto from 'crypto';

export const createRazorpayOrder = async (req, res) => {
  try {
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("❌ Razorpay keys are missing in environment variables.");
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

 

const { amount } = req.body;
if (!amount) {
  return res.status(400).json({ message: "Amount is required" });
}

const options = {
  amount, // ✅ already converted on frontend
  currency: 'INR',
  receipt: `receipt_order_${Date.now()}`,
};

const order = await razorpay.orders.create(options);
res.status(200).json(order);




  } catch (err) {
    console.error("❌ Razorpay Order Creation Error:", err.message);
    res.status(500).json({ message: 'Razorpay order failed', error: err.message });
  }
};

export const verifyRazorpayPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (err) {
    console.error("❌ Razorpay Signature Verification Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Optional Debug Logging
console.log("🧪 Razorpay Keys", {
  id: process.env.RAZORPAY_KEY_ID,
  secret: process.env.RAZORPAY_KEY_SECRET,
});
