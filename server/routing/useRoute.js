const express=require("express")
const { getUser,register, loginUser,logoutUser,generateOTP,verifyOTP } = require( "../controller/userController" )
const verifyjwt = require( "../middleware/auth" )
const router=express()

router.route("/user").get(getUser)
router.route("/register").post(register)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)
router.route("/generate").post(generateOTP)
router.route("/verify").post(verifyOTP)

module.exports=router