import mongoose, { Model, ObjectId } from "mongoose";
import bcrypt from 'bcrypt';
import algosdk from 'algosdk';

const Schema = mongoose.Schema;

export interface IUser {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    gender: string;
    walletAddress: string;
    walletMnemonic: string; // Stored, but never exposed in frontend
}

interface UserModel extends Model<IUser> {
    signUp(user: IUser): Promise<IUser>;
    login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    walletAddress: { type: String, required: true },
    walletMnemonic: { type: String, required: true }, // DO NOT expose this in frontend
});

userSchema.static('login', async function (email: string, password: string) {
    const user: IUser | null = await this.findOne({ email });
    if (!user) throw Error("Wrong email or password");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw Error("Wrong email or password");

    return user;
});

userSchema.static('signUp', async function ({ name, email, password, gender }) {
    const exists = await this.findOne({ email });
    if (exists) throw Error("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const account = algosdk.generateAccount();
    const walletAddress = account.addr;
    const walletMnemonic = algosdk.secretKeyToMnemonic(account.sk);

    const result = await this.create({
        name,
        email,
        password: hash,
        gender,
        walletAddress,
        walletMnemonic,
    });

    return result;
});

export const User = mongoose.model<IUser, UserModel>('User', userSchema);

