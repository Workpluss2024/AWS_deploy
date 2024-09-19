import Otp from '../models/Otp.js';

// Generate 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP to phone and save to database
export async function sendPhoneOtp(req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = generateOtp();
  const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

  try {
    // Save OTP in the database
    await Otp.create({
      otp,
      phoneNumber,
      expiryDate
    });

    console.log(`OTP for phone number ${phoneNumber}: ${otp}`); // Simulate sending OTP
    res.status(200).json({ message: 'OTP sent to phone (simulated)' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
}

// Send OTP to email and save to database
export async function sendEmailOtp(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = generateOtp();
  const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

  try {
    // Save OTP in the database
    await Otp.create({
      otp,
      email,
      expiryDate
    });

    console.log(`OTP for email ${email}: ${otp}`); // Simulate sending OTP
    res.status(200).json({ message: 'OTP sent to email (simulated)' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
}

// Verify OTP for phone or email from database
export async function verifyOtp(req, res) {
  const { phoneNumber, email, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  let otpRecord;
  try {
    // Find the OTP in the database based on phoneNumber or email
    if (phoneNumber) {
      otpRecord = await Otp.findOne({ phoneNumber, otp });
    } else if (email) {
      otpRecord = await Otp.findOne({ email, otp });
    } else {
      return res.status(400).json({ message: 'Phone number or email is required' });
    }

    // Check if OTP exists and is still valid
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const now = new Date();
    if (now > otpRecord.expiryDate) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP verified successfully, you can delete the OTP now
    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify OTP', error });
  }
}
