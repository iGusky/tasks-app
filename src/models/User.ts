import { randomUUIDv7 } from "bun";
import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthdate: {type: Date}
},{
    timestamps: true,
})

export const User = model("User", userSchema)