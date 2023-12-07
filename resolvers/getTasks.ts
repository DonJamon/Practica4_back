// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import taskModel from "../db/Task.ts";
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};
const getTasks = async (
  req: Request,
  res: Response,
) => {
  try {
    const tasks = await taskModel.find().exec();
    if (!tasks || tasks.length === 0) {
      res.status(404).send("empty DB");
      return;
    }
    const taskData = tasks.map((task) => ({
      name: task.name,
      status: task.status,
      company: task.company,
      worker: task.worker,
    }));
    res.status(200).json(taskData);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default getTasks;
