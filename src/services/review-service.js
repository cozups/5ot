import { reviewModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ReviewService {
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  async getReview(review_id){
    const review = await this.reviewModel.findByReviewId(review_id);
    return review;
  }
  
  async getReviews(product_id) {
    const reviews = await this.reviewModel.findByProductId(product_id);
    return reviews;
  }
  async addReview(req_input) {
    // 객체 destructuring
    const createdReview = await this.reviewModel.create(req_input);
    return createdReview;
  }
  async setReview(review_id,toUpdate) {
 
    const updatedReview = await this.reviewModel.update({
      review_id,
      update: toUpdate,
    });

    return updatedReview;
  }
  async deleteById(review_id){
    const deletedCount= await this.reviewModel.deleteById(review_id);
    return deletedCount;
  }
}


const reviewService = new ReviewService(reviewModel);

export { reviewService };
