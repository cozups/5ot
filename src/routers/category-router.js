import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from '../middlewares';
import { categoryService, productService } from '../services';

const categoryRouter = Router();


categoryRouter.get('', async(req,res,next)=>{
try {
  const categories = await categoryService.getAllCategory();
  res.status(201).json(categories);
} catch (error){
  next(error);
}
});

categoryRouter.post('', async(req,res,next)=>{
  try{

    const { sex, type } = req.body;

    const new_category = await categoryService.addCategories({
      sex, type,
    });

    res.status(201).json(new_category);
  } catch (error){
    next(error);
  }
});

categoryRouter.delete('', async function (req, res, next) {
  try {
    const { sex, type } = req.body;
    
  const message = await categoryService.deleteCategory({ sex, type })
  res.status(200).json(message);

  } catch (error) {
    next(error);
  }
});


export { categoryRouter };
