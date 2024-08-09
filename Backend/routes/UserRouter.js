const express=require('express');
const UserController = require('../controllers/Userctl');
const UserRouter=express.Router();
const isAuth=require('../middlewares/isAuth')


//*Registration
UserRouter.post('/api/v1/users/register',UserController.register);

//*login
UserRouter.post('/api/v1/users/login',UserController.login);

//*profile
UserRouter.get('/api/v1/users/profile',isAuth,UserController.profile);

//*changepassword
UserRouter.put('/api/v1/users/change-password',isAuth,UserController.changepass);

//*updateprofile 
UserRouter.put('/api/v1/users/update-profile',isAuth,UserController.updateuserprofile );

module.exports=UserRouter