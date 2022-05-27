import { Schema } from 'mongoose';


const CategorySchema = new Schema(
  {
    category: {
      type: new Schema(
        {
          sex: String,
          type: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
  }, 
  {
    unique: true,
    collection: 'Category',
    timestamps: false,
  },
);



export { CategorySchema };
