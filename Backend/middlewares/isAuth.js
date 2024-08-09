const JWT=require('jsonwebtoken')


const isAuthenticated= async (req,res,next)=>{
  //*get the token from browser
  const headerObj=req.headers;
  //console.log(headerObj)
  const token=headerObj?.authorization?.split(' ')[1]

  //*verify 
  const verify=JWT.verify(token,"Dhruv",(err,decoded)=>{
    //console.log(decoded);
    if(err){
      return false;
    }
    else{
      return decoded
    }
  })

  if(verify){
    //!Save user req body
    req.user=verify.id
    next();
  }
  else{
    const err=new Error('Token Expires,try again')
    next(err);
  }
  
}


module.exports=isAuthenticated;
