import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class UserModel {
  async findByEmail(email) {
    const order = await Order.findOne({ email });
    return order;
  }

  async findById(userId) {
    const order = await Order.findOne({ _id: userId });
    return order;
  }

  async create(userInfo) {
    const createdNewUser = await Order.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const order = await Order.find({});
    return order;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await Order.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

const orderModel = new OrderModel();

export { orderModel };
