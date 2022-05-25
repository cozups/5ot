import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService, userService } from '../services';

const orderRouter = Router();

orderRouter.post('/',async(req,res,next)=>{
  try{

  }
  catch(error){
    next(error);
  }
});



orderRouter.post('/orderlist',async(req,res,next)=>{
  try{
    //email is admin
    
    //email is not admin
  } catch(error){
    next(error);
  }
});


export { orderRouter };
