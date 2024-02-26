const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
      },
    description: {
        type: String,
     required:true,
    },
    price:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Cart", cartSchema);
