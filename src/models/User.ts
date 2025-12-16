import { model, Schema } from "mongoose";
import { taskSchema } from "./Task.js";


const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthdate: {type: Date},
    tasks: {type: [taskSchema]}
},{
    timestamps: true,
})

export const User = model("User", userSchema)