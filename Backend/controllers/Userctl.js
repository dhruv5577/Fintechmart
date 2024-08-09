const asyncHandler=require('express-async-handler')
const User = require('../model/User')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken');



//!User registraion

const UserController={

  //*Register
  register: asyncHandler( async(req,res)=>{
    const {username,email_id,password} =req.body
    console.log(req.body)

  //*Validate
  if(!username || !email_id|| !password){
    throw new Error('All fields are required')
  }

  //*check user's existance
  const userExist=await User.findOne({email_id})
  if(userExist){
    throw new Error('User is already Exists')
  }


  //*Hashing the password
  const salt =await bcrypt.genSalt(10);
  const hashespassword=await bcrypt. hash(password,salt);


  //!save user into DB
  const userCreated=await User.create({
    username,
    email_id,
    password:hashespassword
  })


    res.json({message:"registraion successfully happened"})
  }),


  //*Login
  login:asyncHandler( async (req,res)=>{
    //*get user data
    const {email_id,password}=req.body;

    const user=await User.findOne({email_id});
    if(!user){
      throw new Error('Invalid Credentials');
    }

    const isSame=await bcrypt.compare(password,user.password);
    if(!isSame){
      throw new Error('Invalid Credentials');
    }

    //*generate web token
    const token=JWT.sign({id:user._id},"Dhruv",{
      expiresIn:"15d"
    })

    //*send the response
    res.json({
      message:'Login is Successfully happened',
      token,
      id:user._id,
      email:user.email_id,
      username:user.username
    })

  }

  ),


  //*Profile
  profile:asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user);
    if(!user){
      throw new Error('User not found')
    }

    res.json({username:user.username,email_id:user.email_id})
  }),


  //*change password
  changepass:asyncHandler(async(req,res)=>{

    const {newPassword}=req.body;

    const user=await User.findById(req.user);
    if(!user){
      throw new Error('User not found')
    }

    const salt =await bcrypt.genSalt(10);
    const hashespassword=await bcrypt. hash(newPassword,salt);
    user.password=hashespassword;

    //!update the changes
    await user.save();

    res.json({message:"password has been updated successfully"})
  }),


  //*updateprofile 
  updateuserprofile:asyncHandler(async(req,res)=>{
    const {email_id,username}=req.body;

    const updateduser=await User.findByIdAndUpdate(req.user,
      {
       username,
       email_id
      },{
        new:true
      }
    )

    res.json({message:"user Profile updated successfully",updateduser})
  }),


}

module.exports=UserController