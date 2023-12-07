// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import taskModel from "../db/Task.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, status, company, worker } = req.body;
  if (!name || !status || !company || !worker) {
    res.status(400).send("All fields are required");
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
const postTask = async (
  req: Request,
  res: Response,
) => {
  try {
    validateRequestBody(req, res, () => {});
    const { name, status, company, worker } = req.body;
    const alreadyExists = await taskModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Task already in DB");
      return;
    }
    const newTask = new taskModel({ name, status, company, worker });
    await newTask.save();
    res.status(200).send({
      name: newTask.name,
      status: newTask.status,
      company: newTask.company,
      worker: newTask.worker,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default postTask;
