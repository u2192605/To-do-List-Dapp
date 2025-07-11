import mongoose, { Model, ObjectId } from 'mongoose';
const Schema = mongoose.Schema;

export interface iTodo {
  _id: ObjectId;
  name: string;
  finished: boolean;
  categoryID: string;
  userID: string;
  appId: number;
  taskDoerAddress: string;
  rewardAmount: number;
}

interface TodoModel extends Model<iTodo> {}

const todoSchema = new Schema<iTodo, TodoModel>({
  name: { type: String, required: true },
  finished: { type: Boolean, required: true },
  categoryID: { type: String, required: true },
  userID: { type: String, required: true },
  appId: { type: Number, required: true },
  taskDoerAddress: { type: String, required: true },
  rewardAmount: { type: Number, required: true }
});

todoSchema.index({ userID: 1, categoryID: 1 });

export const Todo = mongoose.model<iTodo, TodoModel>('Todo', todoSchema);
