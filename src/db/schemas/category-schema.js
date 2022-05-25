import { mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const CategorySchema = new Schema(
  {
    category: {
      type: new Schema(
        {
          sex: String,
          type: String,
        },
      ),
      required: true,
    },
  }, 
  {
    unique: true,
    collection: 'Category',
    timestamps: true,
  },
);
CategorySchema.plugin(autoIncrement.plugin, {
  model: 'category',
  field: 'categoryId',
  startAt: 1,
  incrementBy: 1
});

export { CategorySchema };
