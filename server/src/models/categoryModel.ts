import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
        default: "#FFFFFF",
    },
})

export const Category = mongoose.model('Category', categorySchema)