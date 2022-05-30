import { model } from 'mongoose';
import { ReviewSchema } from '../schemas/review-schema';

const Review = model('reviews', ReviewSchema);

export class ReviewModel {

  async findByProductId(product_id) {
    const reviews = await Review.find({ product_id });
    return reviews;
  }
  async findByReviewId(review_id) {
    const review = await Review.findOne({ review_id });
    return review;
  }
  async create(req_input){
    const createdReview= await Review.create(req_input);
    return createdReview;
  }
  async update({ review_id, update }) {
    const filter = { review_id: review_id };
    const option = { returnOriginal: false };

    const updatedReview = await Review.findOneAndUpdate(filter, update, option);
    return updatedReview;
  }
  async deleteById(review_id){
    const {deletedCount}= await Review.deleteOne({review_id});
    return deletedCount;
    }
}


const reviewModel = new ReviewModel();

export { reviewModel };
