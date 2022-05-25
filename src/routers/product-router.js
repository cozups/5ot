//router정의 순서가 영향을 미치나?
import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { productService } from '../services';
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage }); //dest : 저장 위치

const productRouter = Router();

// 주문 api (아래는 /register이지만, 실제로는 /product/order 요청해야 함.)
// orderList, email, address, phonenumber등을 받음

productRouter.get('/:sex/:type/:product_id', async (req, res, next) => {
  try {
    const sex = req.params.sex;
    const type = req.params.type;
    const product_id = req.params.type;

    const product_specific = await productService.getItem({
      sex,
      type,
      product_id,
    });
    res.status(201).json(product_specific);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:sex/:type', async (req, res, next) => {
  try {
    const sex = req.params.sex;
    const type = req.params.type;

    const product_lists = await productService.getItems({
      sex,
      type,
    });

    res.status(201).json(product_lists);
  } catch (error) {
    next(error);
  }
});

productRouter.post('/add', upload.single('image'), async (req, res, next) => {
  try {
    console.log(req.file);

    const product_name = req.body.product_name;
    const sex = req.body.sex;
    const type = req.body.type;
    const product_image = `/images/${req.file.filename}`; // image 경로 만들기
    const price = req.body.price;
    const producer = req.body.producer;
    const stock = req.body.stock;
    const product_info = req.body.product_info;
    const category = { sex, type };

    const new_product = await productService.addItems({
      product_name,
      category,
      product_image,
      price,
      producer,
      stock,
      product_info,
    });

    res.status(201).json(new_product);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
