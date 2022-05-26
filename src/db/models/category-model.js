import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {

  async findOne(sex) {
    const category = await Category.findOne({ sex });
    return category;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create(categoryInfo);
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async findByCategory(input) {
    const { sex, type } = input;
    const findCategory = await Category.findOne({input}); // 쿼리문안에 들어간다
    return findCategory;
  }


  // async update({ type, sex }) {
  //   const filter = { type };
  //   const option = { sex };

  //   const updatedCategory = await User.findOneAndUpdate(filter, update, option);
  //   return updatedCategory;
  // }

  async deleteCategory (input) {
    const { sex, type } = input;
    const { deletedCount } = await Category.deleteOne({ category: {sex: sex, type: type} });

    return deletedCount
  }
}


const categoryModel = new CategoryModel();

export { categoryModel };
