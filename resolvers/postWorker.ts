// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import workerModel from "../db/Worker.ts";

// Middleware para validar los datos del cuerpo de la solicitud
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, company, tasks } = req.body;
  if (!name || !company || !tasks) {
    res.status(400).send("Missing fields");
    return;
  }
  if (tasks>10) {
    res.status(400).send("10 task max");
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
const postWorker = async (
  req: Request,
  res: Response,
) => {
  try {
    validateRequestBody(req, res, () => {});
    const { name, company, tasks } = req.body;
    const alreadyExists = await workerModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Worker already in DB");
      return;
    }
    const newWorker = new workerModel({ name, company, tasks });
    await newWorker.save();
    res.status(200).send({
      name: newWorker.name,
      company: newWorker.company,
      tasks: newWorker.tasks,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default postWorker;
