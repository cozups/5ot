import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    OrderList: {   
      type: new Schema(
        {
          product_id: String,
          quantity: Integer,
          price: Integer,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
