// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import taskModel from "../db/Task.ts";
const validateIdFormat = (
  req: Request,
  res: Response,
  next: NextFunction,
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
  res.status(500).send({ error: "Something went wrong!" });
};
const getTask = async (
  req: Request,
  res: Response,
) => {
  try {
    validateIdFormat(req, res, () => {});
    const { id } = req.params;
    const task = await taskModel.findById(id).exec();
    if (!task) {
      res.status(404).send("task not in DB");
      return;
    }
    res.status(200).send({
      name: task.name,
      status: task.status,
      company: task.company,
      worker: task.worker,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default getTask;