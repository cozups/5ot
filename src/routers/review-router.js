import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
//import { loginRequired } from '../middlewares';
import { categoryService, reviewService ,userService} from '../services';

const reviewRouter = Router();

reviewRouter.get('/', async (req, res, next) => {
  try {
    const product_id= req.body.product_id; 
    const reviews = await reviewService.getReviews(product_id);
    res.status(201).json(reviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.post('/', async (req, res, next) => {
  try {
    const {product_id, email, userName,rate,review} = req.body

    const new_review = await reviewService.addReview({
      product_id, email, userName,rate,review,
    });

    res.status(201).json(new_review);
  } catch (error) {
    next(error);
  }
});

reviewRouter.delete('/', async function (req, res, next) {
  try {
    const {review_id, email}= req.body;

    const{ originEmail}=await reviewService.getReview(review_id);
    const {role} =await userService.getUserByEmail(email);

    if((originEmail !== email )&& (role!=='admin')){
      throw new Error("리뷰를 삭제할 권한이 없습니다.")
    }

    const deletedCount = await reviewService.deleteById(review_id);
    res.status(200).json(deletedCount);
  } catch (error) {
    next(error);
  }
});

reviewRouter.patch('/', async function (req, res, next) {
  try {
    const {review_id, email, rate, review}= req.body;

    const{ originEmail}=await reviewService.getReview(review_id);
    const {role} =await userService.getUserByEmail(email);

    if((originEmail !== email )&& (role!=='admin')){
      throw new Error("리뷰를 수정할 권한이 없습니다.")
    }

    const toUpdate = {
      ...(rate && { rate }),
      ...(review && { review }),
    };

    const updatedReviewInfo = await reviewService.setReview(
      review_id,
      toUpdate
    );

    res.status(200).json(updatedReviewInfo);
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
