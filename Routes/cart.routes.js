const express = require("express")
const cartModel = require("../Model/cart.model")
const cartRouter = express.Router();

cartRouter.post('/postcart',async(req,res)=>{
    try{
        const cart = new cartModel(req.body);
        await cart.save();
        res.status(201).send(cart);
    }catch(error){
        res.status(500).send(error)
    }
})

cartRouter.get('/getcart',async(req,res)=>{
    try{
        const cart = await cartModel.find();
        res.send(cart);
    }catch(error){
        res.status(500).send(error)
    }
})

cartRouter.put('/updatecart/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedCart = await cartModel.findByIdAndUpdate(id, req.body);
        if (!updatedCart) {
            return res.status(404).send({ message: "Cart item not found" });
        }
        res.send({ message: "Cart item updated successfully" });
    }catch(error){
        res.status(500).send(error)
    }
})

cartRouter.delete('/detecart/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteCart = await cartModel.findByIdAndDelete(id);
        if (!deleteCart) {
            return res.status(404).send({ message: "Cart item not found" });
        }
        res.send({ message: "Cart item deleted successfully" });
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = cartRouter;