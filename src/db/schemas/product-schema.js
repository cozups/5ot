//DW CHOI 2022_05_23 
//DESCRIPTION: schema for product

import { Schema } from 'mongoose';

const Productschema = new Schema(
  {
    product_name: { //primary key 인데 설정 어떻게 하는지 모름..
      type: String,
      required: true,
    },
    sex: {
      type: Integer, //0 is woman 1 is man
      required: true,
    },
    type_num: {
      type: Integer, 
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
        type: Integer,
        required: true,
        minimum: 0,
      },
    price: {
      key:{$gte:0},
      type: Integer,
      required: true,
      minimum: 0,
    },
    stock:{
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
