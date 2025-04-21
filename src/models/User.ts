import mongoose, {Schema} from "mongoose";

export interface IUser{
    handle: string
    name: string
    email: string
    password: string
}

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    }
})


const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;