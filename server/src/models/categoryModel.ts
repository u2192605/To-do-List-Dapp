import mongoose, { ObjectId, Model } from 'mongoose'

const Schema = mongoose.Schema


export interface ICateogry {
    _id: ObjectId,
    name: string,
    color: string,
    userID: string,
}

interface CategoryModel extends Model<ICateogry> {

}

const categorySchema = new Schema<ICateogry, CategoryModel>({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true, default: "#FFFFFF" },
    userID: { type: String, required: true }
})

export const Category = mongoose.model<ICateogry, CategoryModel>
    ('Category', categorySchema)