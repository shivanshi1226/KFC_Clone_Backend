const express = require("express")
const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.Secret_Key, function(err, decoded) {
        if(err){
            return res.status(401).send({message : "Invalid Token" })
        }
        if(decoded){
           req.body.emailId = decoded.emailId,
            next()
        }
      });
}

module.exports = auth;