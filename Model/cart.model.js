const mongoose = require("mongoose");

const cartSchema= mongoose.Schema({
  image:String,
  title:String,
  desc:String,
  price:String,
  id:String,
  qty:Number
})

const cartModal = mongoose.model("cart",cartSchema)
module.exports= cartModal;