const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
require("dotenv").config()
const randomstring = require('randomstring');
const User = require( "../models/userModel" )
const { ApiResponse } = require( "../utils/ApiResponse" )
const { validateRegistration, validateLogin } = require( "../configuration/validation" )

//store otp in database
const otpDatabase = {};

const getUser=asyncHandler(async(req,res)=>{
    try {
        const user=await User.find()
        res.status(200).json(new ApiResponse(200,{user},"user information"))
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something gone wrong while getting user"})
    }
})

const register = asyncHandler(async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);

    if (error) {
      return res.status(400).json({ message: 'Validation error', errors: error.details.map(d => d.message) });
    }

    const { email, phone, password } = req.body;
    console.log(phone)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }

    const newUser = new User({ email, phone, password });
    const authToken = await newUser.generateAuthToken();

    await newUser.save();

    // Set session and cookie after successful registration
    req.session.userId = newUser._id;
    res.cookie("authToken", authToken, { maxAge: 3600000, httpOnly: true });

    res.status(201).json(new ApiResponse(201, { user: newUser, authToken }, "User registered successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong during registration" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).json({ message: 'Validation error', errors: error.details.map(d => d.message) });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const authToken = await user.generateAuthToken();

    // Set session and cookie after successful login
    req.session.userId = user._id;
  
    res.cookie("authToken", authToken, { maxAge: 3600000, httpOnly: true });

    res.status(200).json(new ApiResponse(200, { user, authToken }, "Login successful"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong during login" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the session data
    req.session.destroy();

    // Remove the authToken cookie
    res.clearCookie('authToken');

    // Respond with a success message
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong during logout' });
  }
});
//verify with otp
const generateOTP = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Generate a random 6-digit OTP
  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
 // Store the OTP in the database
 otpDatabase[phoneNumber] = otp;
  res.status(200).json({ otp });
});

const verifyOTP=asyncHandler(async(req,res)=>{
  const { phoneNumber, otp } = req.body;

  // Check if OTP matches the one stored in the database
  if (otp === otpDatabase[phoneNumber]) {
    // If OTP is correct, delete it from the database
    delete otpDatabase[phoneNumber];
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false });
  }
})

module.exports={getUser,register,loginUser,logoutUser,generateOTP,verifyOTP}