import { Schema } from 'mongoose';


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



export { CategorySchema };
