//DW CHOI 2022_05_23 
//DESCRIPTION: schema for product

import { mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const Productschema = new Schema(
  {
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
    SizeStockList: {   
      type: new Schema(
        {
          size: Integer,
          stock: Integer,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    price: {
      key:{$gte:0},
      type: Integer,
      required: true,
      minimum: 0,
    },
    product_id: {
      type: Integer,
      required: true,
    },
    product_info: {
      type: Integer,
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
OrderSchema.plugin(autoIncrement.plugin, {
  model: 'product',
  field: 'product_id',
  startAt: 1,
  incrementBy: 1
});

export { ProductSchema };
