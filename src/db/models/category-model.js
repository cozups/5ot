import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {

  async findOne(sex) {
    const category = await Category.findOne({ sex });
    return category;
  }

  async insertCategory(category) {
    const createdNewCategory = await Category.create(category);
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


  async update({ categoryRequired, update }) {
    const {sex_YetUpdated, type_YetUpdated}= categoryRequired
    const filter = { sex: sex_YetUpdated, type: type_YetUpdated };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }


  async deleteCategory (category_id) {

    const { deletedCount } = await Category.deleteOne({category_id});
    return deletedCount
  }
}


const categoryModel = new CategoryModel();

export { categoryModel };
