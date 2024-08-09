const express=require('express');
const TransactionRouter=express.Router();
const isAuth=require('../middlewares/isAuth');
const TransactionController = require('../controllers/Transactionctl');


//*add
TransactionRouter.post('/api/v1/transaction/add',isAuth,TransactionController.create);

//*lists
TransactionRouter.get('/api/v1/transaction/lists',isAuth,TransactionController.getfiltertransaction);

// //*update
TransactionRouter.put('/api/v1/transaction/update/:id',isAuth,TransactionController.update);

// //*delete
TransactionRouter.delete('/api/v1/transaction/delete/:id',isAuth,TransactionController.delete);



module.exports=TransactionRouter