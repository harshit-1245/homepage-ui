const express=require("express")
const { getUser,register, loginUser,logoutUser,generateOTP,verifyOTP,saveAddress,getAddress,removeAdd,getProfile, storeOrder} = require( "../controller/userController" )
const verifyjwt = require( "../middleware/auth" )
const router=express()

router.route("/user").get(getUser)
router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)
router.route("/generate").post(generateOTP)
router.route("/verify").post(verifyOTP)
router.route("/address").post(saveAddress)
router.route("/getAddress/:userId").get(getAddress)
router.route("/removeAdd").post(removeAdd)
router.route("/profile/:userId").get(getProfile)
router.route("/order").post(storeOrder)

module.exports=router