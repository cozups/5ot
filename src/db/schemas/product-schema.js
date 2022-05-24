//DW CHOI 2022_05_23 
//DESCRIPTION: schema for product

import { Schema } from 'mongoose';

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
    womanType: {   //확인 요청, type 중복으로 사용됨, 이렇게 작성하면 되는지
      type: new Schema(
        {
          new: String,
          beauty: String,
          shoes: String,
          dress: String,
        },
        {
          _id: false, // 역할이 무엇인지
        }
      ),
      required: true,
    },
    manType: {   //확인 요청, type 중복으로 사용됨, 이렇게 작성하면 되는지
      type: new Schema(
        {
          new: String,
          suit: String,
          shoes: String,
          athletics: String,
        },
        {
          _id: false,
        }
      ),
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
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
