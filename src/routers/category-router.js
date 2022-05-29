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

    const new_category = await categoryService.addCategories({
      sex,
      type,
    });

    res.status(201).json(new_category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.delete('/', async function (req, res, next) {
  try {
    const category_id = req.body.category_id;
    const sex = req.body.sex;
    const type = req.body.type;

    const deletedCategory = await categoryService.deleteCategory(category_id);
    const deletedCount = await productService.deleteByCategory({ sex, type });
    console.log(deletedCategory);
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

categoryRouter.patch('/', async function (req, res, next) {
  try {
    const sex_YetUpdated = req.body.sex;
    const type_YetUpdated = req.body.type;
    const sex = req.body.updateSex;
    const type = req.body.updateType;

    const categoryRequired = { sex_YetUpdated, type_YetUpdated };

    const toUpdate = {
      ...(sex && { sex }),
      ...(type && { type }),
    };

    const updatedCategoryInfo = await categoryService.setCategory(
      categoryRequired,
      toUpdate
    );

    res.status(200).json(updatedCategoryInfo);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
