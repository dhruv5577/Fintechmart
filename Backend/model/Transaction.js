const mongoose=require('mongoose');

const TransactionSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  category:{
    type:String,
    required:true,
    default:"Uncategorized"
  },
  type:{
    type:String,
    required:true,
    enum:["income","expense"]
  },
  amount:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  description:{
    type:String,
    required:false
  }

},{
  timestamps:true,
}
)


module.exports=mongoose.model("Transaction",TransactionSchema)