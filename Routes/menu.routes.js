const express = require("express");
const menuModel = require ("../Model/menu.model");
const cartRouter = require("./cart.routes");
const menuRouter = express.Router();

menuRouter.post("/menuPost",async(req,res)=>{
    try{
        const menu = new menuModel(req.body)
        await menu.save()
        res.status(201).send(menu)
    }catch(error){
        res.status(500).send({message:"Error"})
    }
})

menuRouter.get("/getPost",async(req,res)=>{
    try{
        const menu = await menuModel.find();
        res.status(200).send(menu)
    }catch(error){
        res.status(500).send({message:"Error"})
    }
})

module.exports = menuRouter;