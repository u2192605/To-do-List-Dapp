export type TodoType = {
  _id: string; // optional when creating
  name: string;
  finished: boolean;
  categoryID: string;
  taskDoerAddress: string;
  rewardAmount: number;
  appId?: number; // added after creation
};