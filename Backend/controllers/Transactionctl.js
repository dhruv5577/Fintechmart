const asyncHandler=require('express-async-handler')
const Transaction = require('../model/Transaction');



//!User registraion

const TransactionController={

  //*add
  create: asyncHandler( async(req,res)=>{
    const {type,category,amount,date,description} =req.body

    if(!amount||!date||!type){
      throw new Error('Type,amount and date are required');

    }

    const transaction=await Transaction.create({
      user:req.user,
      type,
      date,
      description,
      amount,
      category
    })

    res.status(200).json(transaction)

    
  }),


  //*lists
  getfiltertransaction:asyncHandler( async (req,res)=>{
    const {startDate,endDate,type,category}=req.query;


    let filters={user:req.user};
    
    if(startDate){
      filters.date={...filters.date,$gte: new Date(startDate)}
    }

    if(endDate){
      filters.date={...filters.date,$lte: new Date(startDate)}
    }

    if(type){
      filters.type=type
    }

    if(category){
      if(category==='All'){
        //no filter is needed
      }
      else if(category==='Uncategorized'){
        filters.category='Uncategorized'
      }
      else{
        filters.category=category
      }
    }

    const transactions=await Transaction.find(filters).sort({date:-1}) ;
    res.json(transactions)

  }

  ),


  //*update
  update:asyncHandler(async(req,res)=>{
    //!find the transaction
    const transactions=await Transaction.findById(req.params.id);

    if(transactions && transactions.user.toString()===req.user.toString()){
      transactions.type=req.body.type|| transactions.type;
      transactions.category=req.body.category|| transactions.category;
      transactions.amount=req.body.amount|| transactions.amount;
      transactions.date=req.body.date|| transactions.date;
      transactions.description=req.body.description|| transactions.description;

      const updatedtransaction=await transactions.save()
      res.json(updatedtransaction);

    }

  }),


  //*delete item
  delete:asyncHandler(async(req,res)=>{

    //!find the transaction
    const transactions=await Transaction.findById(req.params.id);

    if(transactions && transactions.user.toString()===req.user.toString()){
      await transactions.findByIdAndDelete(req.params.id);
      res.json({message:'transaction removed'})
    }
  })


}

module.exports=TransactionController