import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  async create(order_info){
    const createdOrder= await Order.create(order_info);
    return createdOrder;
  }
  async findAllOrder(){
    const allOrders= await Order.find({})
    return allOrders;
  }
  async findByEmail(email){
    const myOrders = await Order.find({email: email});
    return myOrders; 
  }
}

const orderModel = new OrderModel();

export { orderModel };
