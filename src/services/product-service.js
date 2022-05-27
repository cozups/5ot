import { productModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }
  //구현필요
  

  async getItem(product_id){
    const product= await this.productModel.findByProductId(product_id);
    if(!product){
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return product;
  }
  async getItems(req_input){
    const {sex,type}= req_input;
    const category= {sex,type};
    const products= await this.productModel.findByCategory(category);
    if(!products){
      throw new Error(
        '해당 제품이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }
    return products
  }
 async addItems (req_input){
   const createdproduct = await this.productModel.insertItem(req_input);
   return createdproduct;
 }
  async deleteProduct(product_id){
    const deletedCount= await this.productModel.deleteProduct(product_id);
    return deletedCount;
  }
 
  async getAllProduct(){
    const allProducts= await this.productModel.findAll();
    return allProducts;
  }

  async deleteByCategory(input){
    const { sex, type } = input;
    const deletedCount= await this.productModel.deleteByCategory(input);
    return deletedCount;
  }

  async setProduct(product_id,toUpdate) {
 
    const updatedProduct = await this.productModel.update({
      product_id,
      update: toUpdate,
    });

    return updatedProduct;
  }
}



const productService = new ProductService(productModel);

export { productService };
