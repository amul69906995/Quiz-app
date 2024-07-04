const express=require('express')
const router=express.Router()
const catchAsync=require('../error/catchAsync')
const appError=require('../error/appError')






router.get('/all-users',catchAsync(async(req,res,next)=>{

//logic

if(false)throw new appError("testing",400)
res.json({"message":"hi this message is for testing"})

}))








module.exports=router;