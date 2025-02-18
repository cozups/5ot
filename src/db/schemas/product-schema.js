//DW CHOI 2022_05_23
//DESCRIPTION: schema for product

import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Schema = mongoose.Schema;

const autoIncrement = mongooseSequence(mongoose);

const ProductSchema = new Schema(
  {
    category: {
      type: new Schema(
        {
          sex: String,
          type: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },

    stock: {
      key: { $gte: 0 },
      type: Number,
      required: true,
    },
    price: {
      key: { $gte: 0 },
      type: Number,
      required: true,
      minimum: 0,
    },
    product_info: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);
ProductSchema.plugin(autoIncrement, {
  inc_field: 'product_id', // 자동 증가할 필드 이름
  start_seq: 1, // 시작값
  increment_by: 1, // 증가값
});

export { ProductSchema };
