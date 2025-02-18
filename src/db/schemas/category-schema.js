import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Schema = mongoose.Schema;

// mongoose-sequence 플러그인을 mongoose에 적용
const autoIncrement = mongooseSequence(mongoose);

const CategorySchema = new Schema(
  {
    sex: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    collection: 'categories',
    timestamps: false,
  }
);

// mongoose-sequence 플러그인 사용
CategorySchema.plugin(autoIncrement, {
  inc_field: 'category_id', // 자동 증가할 필드 이름
  start_seq: 1, // 시작값
  increment_by: 1, // 증가값
});

export { CategorySchema };
