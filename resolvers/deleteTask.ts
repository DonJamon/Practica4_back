// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import taskSchema from "../db/Task.ts";
const validateIdFormat = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const id = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    res.status(400).send({ error: "Invalid ID format" });
    return;
  }
  next();
};
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });};

export const deleteTask = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  try {
    validateIdFormat(req, res, () => {});
    const id = req.params.id;
    const task = await taskSchema.findByIdAndDelete(id).exec();
    if (!task) {
      res.status(404).send({ error: "task not in DB" });
      return;
    }
    res.status(200).send("Tarea deleted");
  } catch (error) {
    errorHandler(error, req, res);
  }
};
