//DWCHOI 2022_05_23 
//THIS FILE IS NOT DONE WITH MODIFICATION

import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class UserModel {
  async findByEmail(email) {
    const product = await Product.findOne({ email });
    return product;
  }

  async findById(userId) {
    const product = await Product.findOne({ _id: userId });
    return product;
  }

  async create(userInfo) {
    const createdNewUser = await Product.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await Product.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await Product.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}

const userModel = new UserModel();

export { userModel };
