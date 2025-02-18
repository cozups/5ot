import { mongoose } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Schema = mongoose.Schema;

const autoIncrement = mongooseSequence(mongoose);

const ReviewSchema = new Schema(
  {
    product_id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userName: String,
    rate: Number,
    review: String,
  },
  {
    collection: 'reviews',
    timestamps: true,
  }
);

ReviewSchema.plugin(autoIncrement, {
  inc_field: 'review_id', // 자동 증가할 필드 이름
  start_seq: 1, // 시작값
  increment_by: 1, // 증가값
});

export { ReviewSchema };
