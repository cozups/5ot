import { Schema } from 'mongoose';


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
    timestamps: false,
  },
);



export { CategorySchema };
