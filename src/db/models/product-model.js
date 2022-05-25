//DWCHOI 2022_05_23 
//THIS FILE IS NOT DONE WITH MODIFICATION

import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {

 
  async findBySexNType(sex,type) {
    const products = await Product.find({ sex: sex, type: type });
    return products;
  }

  async findByProductID(product_id) {
    const product = await Product.findOne({product_id});
    return product;
  }

  async insertItem(product_object){
    const createdproduct = await Prdocut.create(product_object);
    return createdproduct;
  }
  //define

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }
}


const productModel = new ProductModel();

export { productModel };
