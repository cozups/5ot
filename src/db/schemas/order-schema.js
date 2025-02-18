import { mongoose } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const Schema = mongoose.Schema;

const autoIncrement = mongooseSequence(mongoose);

const OrderSchema = new Schema(
  {
    OrderList: [
      new mongoose.Schema({
        product_id: Number,
        product_name: String,
        quantity: Number,
        price: Number,
      }),
    ],
    order_id: {
      type: Number,
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
OrderSchema.plugin(autoIncrement, {
  inc_field: 'order_id', // 자동 증가할 필드 이름
  start_seq: 1, // 시작값
  increment_by: 1, // 증가값
});

export { OrderSchema };
