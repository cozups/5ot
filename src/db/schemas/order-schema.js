import { mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const OrderSchema = new Schema(
  {
    OrderList: {   
      type: new Schema(
        {
          product_id: String,
          quantity: Integer,
          price: {
            key:{$gte:0},
            type: Integer,
            required: true,
            minimum: 0,
          },
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
OrderSchema.plugin(autoIncrement.plugin, {
  model: 'order',
  field: 'order_id',
  startAt: 1,
  incrementBy: 1
});

export { OrderSchema };
