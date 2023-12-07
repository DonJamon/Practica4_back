import mongoose from "npm:mongoose@7.6.3";
import { Worker } from "../types.ts";

const Schema = mongoose.Schema;

const workerSchema = new Schema(
  {
    name: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: false,
    },
    tasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Task",
      required: false,
    },
  },
  { timestamps: true },
);

export type workerModelType = mongoose.Document & Omit<Worker, "id">;

export default mongoose.model<workerModelType>("worker",workerSchema,);