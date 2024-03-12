const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")
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

const saveAddress=asyncHandler(async(req,res)=>{
  try {
    const {userId,addresses}=req.body;
    const user=await User.findById(userId)
  
     if(!user){
      return res.status(404).json({message:"user not found"})
  
     }
     user.addresses.push(addresses)
     //save and updated user in the backend
     await user.save()
  
     res.status(200).json({message:"Adrress added Successfully"})
  } catch (error) {
    res.status(404).json({message:"Something went wrong while getting address"})
  }
  })

const getAddress=asyncHandler(async(req,res)=>{
try {
  const userId=req.params.userId;

  const user=await User.findById(userId);
  if(!user){
    return res.status(404).json({message:"User not found"})
  }
  const addresses=user.addresses;
  res.status(200).json({addresses})
} catch (error) {
  res.status(500).json({message:"Something went wrong while getting Address"})
}
})
const removeAdd = asyncHandler(async(req, res) => {
  try {
    const { userId, addressId } = req.body; // Extract userId and addressId from request body
    console.log(addressId);
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the address with the matching addressId
    const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId.toString());

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Remove the address from the user's addresses array
    user.addresses.splice(addressIndex, 1);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while removing address" });
  }
});

const getProfile=asyncHandler(async(req,res)=>{
try {
  const userId=req.params.userId;
  const user=await User.findById(userId)
  if(!user){
    res.status(404).json({message:"User not found"})
   }

   res.status(200).json({user})
} catch (error) {
  res.status(500).json({message:"server error while profile fetching"})
}
})

const storeOrder=asyncHandler(async(req,res)=>{
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     // Create an array of product objects from the cart items
     const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image
    }));


      // Create a new order
      const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod
      });
  
      await order.save();
  
      // Update user's orders array by pushing the new order's ID
      user.orders.push(order._id);
      await user.save();
  
      return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
})


module.exports={getUser,register,loginUser,logoutUser,generateOTP,verifyOTP,saveAddress,getAddress,removeAdd,getProfile,storeOrder}