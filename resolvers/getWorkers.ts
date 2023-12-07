// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import workerModel from "../db/Worker.ts";
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });};

const getWorkers = async (
  req: Request,
  res: Response,
) => {
  try {
    const workers = await workerModel.find().exec();
    if (!workers || workers.length === 0) {
      res.status(404).send("empty DB");
      return;
    }
    const workerData = workers.map((worker) => ({
      name: worker.name,
      company: worker.company,
      tasks: worker.tasks,
    }));
    res.status(200).json(workerData);
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default getWorkers;