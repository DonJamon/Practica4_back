// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import companyModel from "../db/Company.ts";
const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, workers } = req.body;
  if (!name || !workers) {
    res.status(400).send("All fields are required");
    return;
  }
  if (workers>10) {
    res.status(400).send("10 workers max");
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
const postCompany = async (
  req: Request,
  res: Response,
) => {
  try {
    validateRequestBody(req, res, () => {});
    const { name, workers } = req.body;
    const alreadyExists = await companyModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Empresa already exists");
      return;
    }
    const newCompany = new companyModel({ name, workers });
    await newCompany.save();
    res.status(200).send({
      name: newCompany.name,
      workers: newCompany.workers,
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
export default postCompany;
