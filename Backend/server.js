const express=require('express');
const UserRouter = require('./routes/UserRouter');
const mongoose=require('mongoose');
const errorhandler = require('./middlewares/ErrorHandler');
const CategoryRouter = require('./routes/CategoryRouter');
const TransactionRouter = require('./routes/TransactionRouter');
const PORT=3000;
const app=express();


//!connect to DB
mongoose.connect("mongodb://localhost:27017/Fintechmart")
.then(()=>console.log('DB connected')).catch((e)=>console.log(e))

//*middlewares
app.use(express.json())

//*Routes
app.use('/',UserRouter)
app.use('/',CategoryRouter)
app.use('/',TransactionRouter)

app.use(errorhandler)
//*Start server
app.listen(PORT,console.log(`server is running on port ${PORT}`))



