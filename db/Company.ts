import mongoose from "npm:mongoose@7.6.3";
import { Company } from "../types.ts";

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    workers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "workers",
      required: true,
    },
  },
  { timestamps: true },
);

export type companyModelType = mongoose.Document & Omit<Company, "id">;

export default mongoose.model<companyModelType>("company", companySchema);