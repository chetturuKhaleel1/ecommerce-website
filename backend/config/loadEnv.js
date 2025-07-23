// backend/config/loadEnv.js
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log("🔁 [loadEnv.js] ENV loaded", {
  id: process.env.RAZORPAY_KEY_ID,
  secret: process.env.RAZORPAY_KEY_SECRET,
});
