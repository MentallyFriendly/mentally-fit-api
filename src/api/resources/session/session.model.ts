import { Document, Schema, Model, model } from 'mongoose';
import { ISession } from '../../../interfaces/session';

export interface ISessionModel extends ISession, Document {}

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Session must have a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    exercises: [{
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

export const Session: Model<ISessionModel> = model<ISessionModel>('session', sessionSchema);