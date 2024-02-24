const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");
const { ApiResponse } = require("../utils/ApiResponse");


const getCart=asyncHandler(async(req,res)=>{
    try {
        const cartItem=await Cart.find()
        res.status(201).json(new ApiResponse(201, { cartItem }, "Cart get successfully"));
    } catch (error) {
        console.error(error);
    }
})

const setCart = asyncHandler(async (req, res) => {
    try {
        const { title, images, description,price } = req.body;

        // Check if title, images, and offer are provided in the request body
        if (!title && !images && !description && !price) {
            return res.status(400).json({ message: "Please provide title, images, and offer" });
        }

        // Create a new cart object
        const newCart = new Cart({
            title,
            images,
            description,
            price
        });

        // Save the new cart object to the database
        await newCart.save();

        // Respond with success message
        res.status(201).json(new ApiResponse(201, { cart: newCart }, "Cart created successfully"));
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

module.exports = { getCart,setCart };
