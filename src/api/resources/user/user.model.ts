import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../../../interfaces/user';

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    passwordHash: {
      required: true,
      type: String
    }
  },
  { timestamps: true }
);

export const User: Model<IUserModel> = model<IUserModel>('user', userSchema);
