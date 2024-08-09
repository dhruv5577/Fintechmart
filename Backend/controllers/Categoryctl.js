const asyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken');
const Categories = require('../model/Categories');
const Transaction = require('../model/Transaction');



//!User registraion

const CategoryController={

  //*add
  create: asyncHandler( async(req,res)=>{
    const {name,type} =req.body
    if(!name || !type){
      throw new Error('Name and type are required for creating a new list')
    }

    //convert to lowercase
    const normalizeName=name.toLowerCase();

    //check type validation
    const validtypes=['income','expense']
    if(!validtypes.includes(type.toLowerCase())){
      throw new Error('Invalid Type' + type);
    }


    //!check if category already exists
    const categoryExists=await Categories.findOne({name:normalizeName,user:req.user})


    if(categoryExists){
      throw new Error(
        `Category ${categoryExists.name} already exists`
      )
    }

    //!create category
    const category=await Categories.create({
      name:normalizeName,
      user:req.user,
      type
    })

    res.status(200).json(category)

    
  }),


  //*lists
  lists:asyncHandler( async (req,res)=>{
    const categories= await Categories.find({user:req.user});
    res.status(200).json(categories)

  }

  ),


  //*update
  update:asyncHandler(async(req,res)=>{
    const categoryId= req.params;
    const {type,name}=req.body

    const normalizename=name.toLowerCase();
    const category=await Categories.findById(categoryId)

    if(!category && !category.user.toString()===req.user.toString()){
      throw new Error('category not found')
    }

     const oldName=category.name;

     //!update category
     category.name=name;
     category.type=type;

     const updatedcategory=await category.save();

     //!update affected trasaction
     if(oldName!==updatedcategory.name){
      await Transaction.updateMany(
        {
          user:req.user,
          category:oldName
        },{
          $set:{category:updatedcategory.name}
        }
      )
     }

     res.json(updatedcategory)
  }

  ),


  //*delete item
  delete:asyncHandler(async(req,res)=>{

    const category=await Categories.findById(req.params.id);
    if(category && category.user.toString()===req.user.toString()){
      const defaultCategory="Uncategorized";
      await Transaction.updateMany(
        {user:req.user,category:category.name},
        {$set:{category:defaultCategory}}
      );
      await Categories.findByIdAndDelete(req.params.id);

      res.json({message:"Category removed and transaction updated"})
    }
    else{
      res.json({message:"category is not found"})
    }
    
  })


}

module.exports=CategoryController