import mongoose from "npm:mongoose@7.6.3";
import { Task } from "../types.ts";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "worker",
        required: true,
      },
  },
  { timestamps: true },
);

export type taskModelType = mongoose.Document & Omit<Task, "id">;

export default mongoose.model<taskModelType>("task", taskSchema);
