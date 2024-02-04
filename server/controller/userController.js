const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
require("dotenv").config()
const User = require( "../models/userModel" )
const accountSid = "ACb0461241955cb3bf6d51938646269301";
const authToken = "e751897fda01f8ca9659c3ae54420331";
const verifySid = "VA43563e2bd5d9838fd44912f1947f3d5d";
const client = require("twilio")(accountSid, authToken);




const { ApiResponse } = require( "../utils/ApiResponse" )
const { validateRegistration, validateLogin } = require( "../configuration/validation" )




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
const verifyWithOtp=asyncHandler(async(req,res)=>{
  try {
   const {phoneNumber}=req.body;

   client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+919670236718", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+919670236718", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong during generating OTP" });
  }
})

module.exports={getUser,register,loginUser,logoutUser,verifyWithOtp}