import { mongoose, trusted } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const CategorySchema = new Schema(
  {
    sex: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
    {
    collection: 'categories',
    timestamps: false,
  }

  
);

CategorySchema.plugin(autoIncrement.plugin, {
  model: 'category',
  field: 'category_id',
  startAt: 1,
  incrementBy: 1
});

export { CategorySchema };
