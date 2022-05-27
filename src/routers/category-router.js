import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from '../middlewares';
import { categoryService, productService } from '../services';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategory();
    res.status(201).json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.post('/', async (req, res, next) => {
  try {
    const sex = req.body.sex;
    const type = req.body.type;

    console.log(sex,type);
    const new_category = await categoryService.addCategories({
      sex, type,
    });

    res.status(201).json(new_category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete('/', async function (req, res, next) {
  try {
    const { sex, type } = req.body;

    const deletedCategory = await categoryService.deleteCategory({ sex, type });
    const deletedCount = await productService.deleteByCategory({ sex, type });

    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

categoryRouter.patch('/', async function (req, res, next) {
    try {
      // body data 로부터 업데이트할 sex, type을 추출함.
      const sex = req.body.sex;
      const type = req.body.type;
      const updateSex = req.body.updateSex;
      const updateType = req.body.updateType;

      const categoryRequired={ sex, type }

      const toUpdate = {
        ...(updateSex && { updateSex }),
        ...(updateType && { updateType }),
      };

      // 사용자 정보를 업데이트함.
      const updatedCategoryInfo = await categoryService.setCategory(
        categoryRequired,
        toUpdate
      );
      const updatedProductInfo = await productService.setProduct({ sex, type });
      

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedCategoryInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { categoryRouter };
