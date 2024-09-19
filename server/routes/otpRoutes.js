import express from 'express';
const router = express.Router();

import { sendPhoneOtp, sendEmailOtp, verifyOtp } from '../controllers/otpController.js';

router.post('/send-phone-otp', sendPhoneOtp);
router.post('/send-email-otp', sendEmailOtp);
router.post('/verify-otp', verifyOtp);

export default router;
