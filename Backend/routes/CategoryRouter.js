const express=require('express');
const CategoryRouter=express.Router();
const isAuth=require('../middlewares/isAuth');
const CategoryController = require('../controllers/Categoryctl');


//*add
CategoryRouter.post('/api/v1/category/add',isAuth,CategoryController.create);

//*lists
CategoryRouter.get('/api/v1/category/lists',isAuth,CategoryController.lists);

// //*update
CategoryRouter.put('/api/v1/category/update',isAuth,CategoryController.update);

// //*delete
CategoryRouter.delete('/api/v1/category/delete',isAuth,CategoryController.delete);



module.exports=CategoryRouter