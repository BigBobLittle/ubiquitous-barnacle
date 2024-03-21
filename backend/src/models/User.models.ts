import mongoose, { Schema, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    gender: string;
    sleepTime: string;
    currentDate: Date;
  }

  
const userSchema: Schema<IUser> = new Schema({
    name: String,
    gender: String,
    sleepTime: String,
    currentDate: { type: Date, default: Date.now }
  });
  
const User: Model<IUser> = mongoose.model('User', userSchema);

export default User