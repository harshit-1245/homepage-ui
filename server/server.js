const express = require("express")
const cors=require("cors")
const { connectDB } = require( "./database/db" )
const app=express()

require("dotenv").config()

const port=process.env.PORT || 4000

connectDB()
app.use(express.json())

app.post("/register",(req,res)=>{
    const {email,mobileNumber,password,confirmPassword}=req.body
    try {
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
})


app.listen(port,()=>{
    console.log(`server live at port ${port}`)
})


