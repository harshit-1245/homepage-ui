const express = require("express");
const {getCart, setCart } = require( "../controller/cartController" );
const router = express.Router();

// Define your routes here
router.route("/getCart").get(getCart)
router.route("/cart").post(setCart)

// Export the router
module.exports = router;
