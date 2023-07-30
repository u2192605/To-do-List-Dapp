import mongoose, { ObjectId, Model } from 'mongoose'

const Schema = mongoose.Schema


export interface ICateogry {
    _id: ObjectId,
    name: string,
    userID: string,
}

interface CategoryModel extends Model<ICateogry> {

}

const categorySchema = new Schema<ICateogry, CategoryModel>({
    name: { type: String, required: true },
    userID: { type: String, required: true, index: true }
})

export const Category = mongoose.model<ICateogry, CategoryModel>
    ('Category', categorySchema)