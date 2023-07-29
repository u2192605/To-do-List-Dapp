import { Request, Response } from "express"
import { User, IUser } from "../models/userModel";
import jwt from 'jsonwebtoken'
import { ObjectId } from "mongoose";


const createToken = (_id: ObjectId) => {
    if (!process.env.SECRET) {
        throw Error("couldn't find secret")
    }
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: '3d' })
}

export const signUpUser = async (req: Request, res: Response) => {
    const user: IUser = req.body
    try {
        const result = await User.signUp(user);
        const token = createToken(result._id)
            res.status(200).json({
                name: result.name,
                email: result.email,
                gender: result.gender,
                _id: result._id,
                token,
            })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    try {
        const result = await User.login(email, password);
        const token = createToken(result._id)
            res.status(200).json({
                name: result.name,
                email: result.email,
                gender: result.gender,
                _id: result._id,
                token,
            })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}