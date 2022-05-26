import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { orderService, userService } from '../services';

const orderRouter = Router();

orderRouter.post('/',async(req,res,next)=>{
  try{
     const orderList =req.body.orderList;
     const email =req.body.email;
     const fullName= req.body.fullName;
     const phoneNumber =req.body.phoneNumber;
     const postalCode =req.body.postalCode;
     const address1 =req.body.address1;
     const address2 =req.body.address2;
     const address= {postalCode, address1, address2};

    const createdOrder = await orderService.addOrder({
      orderList,email,fullName, phoneNumber,address
    })

    res.status(201).json(createdOrder);
  }
  catch(error){
    next(error);
  }
});

orderRouter.get('/email/:email',async(req,res,next)=>{
  try{
    //email is admin
    let orders;
    const email= req.params.email;
    const user= await userService.getUserByEmail(email);
    if (user.role ==="admin"){
      orders= await orderService.getAllOrder();
    }
    //email is not admin
    else{
      orders= await orderService.getMyOrder(email);
    }

    res.status(200).json(orders);
  } catch(error){
    next(error);
  }
});


export { orderRouter };
