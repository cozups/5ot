import { mongoose, trusted } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

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

ReviewSchema.plugin(autoIncrement.plugin, {
  model: 'review',
  field: 'review_id',
  startAt: 1,
  incrementBy: 1
});

export { ReviewSchema };
