//DW CHOI 2022_05_23 
//DESCRIPTION: schema for product

import { mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const ProductSchema = new Schema(
  {
    category: {
      type: new Schema(
        {
          sex: String,
          type: String,
        },
      ),
      required: true,
    },
    product_name: { //primary key 인데 설정 어떻게 하는지 모름..
      type: String,
      required: true,
      //unique: true, primary key 설정?
    },
    sex: {
      type: String, //w is woman, m is man
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      key:{$gte:0},
      type: Number,
      required: true,
      minimum: 0,
    },
    product_id: {
      type: Number,
      required: true,
    },
    product_info: {
      type: Number,
      required: true,
    },
    product_image: {
      type: String, // 넣을수 있는지 확인
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
ProductSchema.plugin(autoIncrement.plugin, {
  model: 'product',
  field: 'product_id',
  startAt: 1,
  incrementBy: 1
});

export { ProductSchema };
