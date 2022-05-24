import { productModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ProductService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }
  async addOrder(orderInfo){
    const { orderList, email, address, phoneNumber} = orderInfo;
    
  }

}

const productService = new UserService(productModel);

export { produtService };
