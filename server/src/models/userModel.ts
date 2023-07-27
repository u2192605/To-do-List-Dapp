import mongoose, { Model, ObjectId } from "mongoose";
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

export interface IUser {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    gender: string,



}
interface UserModel extends Model<IUser> {
    signUp(user: IUser): IUser;
    login(email: string, password: string): IUser;
}

const userSchema = new Schema<IUser, UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
})

userSchema.static('login', async function (email: string, password: string) {

    const user :IUser| null = await this.findOne({ email })
    if (!user) {
        throw Error("Wrong email or password")
    }
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        throw Error("Wrong email or password")
    }
    return user
})

userSchema.static('signUp', async function ({ name, email, password, gender }) {
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const result = await this.create({ name, email, password: hash, gender })
    return result
})


export const User = mongoose.model<IUser, UserModel>('User', userSchema)