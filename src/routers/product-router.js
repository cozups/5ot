//router정의 순서가 영향을 미치나?
import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { productService } from '../services';

const productRouter = Router();

// 주문 api (아래는 /register이지만, 실제로는 /product/order 요청해야 함.)
// orderList, email, address, phonenumber등을 받음
productRouter.post('/order', async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }
    
    // req (request)의 body 에서 데이터 가져오기
    const orderList = req.body.orderList;
    const email = req.body.email;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    // 위 데이터를 유저 db에 추가하기
    const newOrder = await productService.addOrder({
      orderList,
      email,
      address,
      phoneNumber,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/orderlist', async(req,res,next)=>{

});

productRouter.get('/order/complete', async(req,res,next)=>{

});

productRouter.get('/:sex/:type/:product_id', async(req,res,next)=>{

});

productRouter.get('/:sex/:type', async(req,res,next)=>{

});


export { productRouter };
