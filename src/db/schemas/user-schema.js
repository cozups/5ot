import { mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  }, 
  {
    collection: 'users',
    timestamps: true,
  },
);
UserSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: 'userId',
  startAt: 1,
  incrementBy: 1
});

export { UserSchema };
