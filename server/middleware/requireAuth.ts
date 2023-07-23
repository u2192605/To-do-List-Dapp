import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { IUser, User } from "../src/models/userModel";
interface JwtPayload {
    _id: string;
}
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    //verfiy authentication 
    const {authorization} = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authorization token is required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id } = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        const user = await User.findById(_id).select('_id') as IUser
        Object.defineProperty(req, 'user', {
            value: user,
            writable: false
        })
        next()
    }catch(error: any){
        console.log(error)
        return res.status(401).json({error: 'Request is not authorized'})
    }

}