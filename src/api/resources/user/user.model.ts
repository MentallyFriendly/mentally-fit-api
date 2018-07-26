import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../../../interfaces/user';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export interface IUserModel extends IUser, Document {
  hashPassword(plainTextPassword: string): string;
  authenticate(plainTextPassword: string): boolean;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate(plainTextPassword: string) {
    return compareSync(plainTextPassword, this.password);
  },
  hashPassword(plainTextPassword: string) {
    // Change these methods to ASYNC
    if (!plainTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = genSaltSync();
    return hashSync(plainTextPassword, salt);
  }
};

userSchema.pre('save', function(next) {
  const user = this;

  try {
    const hash = user.hashPassword(user.password);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

export const User: Model<IUserModel> = model<IUserModel>('user', userSchema);
