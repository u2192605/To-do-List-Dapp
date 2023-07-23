import mongoose from 'mongoose'
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    finished:{
        type: Boolean,
        required: true
    },
    categoryID: {
        type: String,
        required: true
    }
})

export const Todo = mongoose.model('Todo', todoSchema)