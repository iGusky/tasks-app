import { model, Schema } from "mongoose";

export const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false},
    done: { type: Boolean, default: false},
    limitDate: { type: Date, required: false }
})

export const Task = model("Task", taskSchema)