const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Model = require('../Model/user.model')

const userRoutes = express.Router();

userRoutes.post('/register',async(req,res)=>{
    try{
        const {emailId,firstName,lastName,password,dateOfBirth,intrestedIn} = req.body
        bcrypt.hash(password, 3, async function(err, hash) {
            if(err){
                return res.status(500).json({message: "Error in hashing password" })
            }
            if(hash){
                const user = new Model({
                    emailId:emailId,
                    password:hash,
                })
                await user.save()
                res.status(200).json({message: "User created successfully" })
            }
        });
    }catch(error){
        res.status(500).json({message:`Internal Server Error,${error}`})
    }
})

userRoutes.post('/login',async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await Model.findOne({emailId})
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.status(500).json({message: "Error in comparing password" })
            }
            if(result){
                const accessToken = jwt.sign({emailId:user.emailId},
                    process.env.Secret_Key,
                    { expiresIn: '1h' }
                )
                const refreshToken = jwt.sign({emailId:user.emailId},
                    process.env.Secret_Key2,
                    {expiresIn: '1d'}
                )
                res.status(200).json({"msg":"User Logged In Successfully",
                   "accessToken": accessToken,
                   "refreshToken": refreshToken
                })
            }
        });
    }catch(error){
        res.status(500).json({"msg":`${error}`})
    }
})


module.exports = userRoutes;