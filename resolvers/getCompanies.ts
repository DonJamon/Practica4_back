// @deno-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import companyModel from "../db/Company.ts";
const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
};
const getCompanies = async (
  req: Request,
  res: Response,
) => {
  try {
    const companies = await companyModel.find().exec();
    if (!companies || companies.length === 0) {
      res.status(404).send("empty DB");
      return;
    }
    const companyData = companies.map((company) => ({
      name: company.name,
      workers: company.workers,
    }));
    res.status(200).json(companyData);
  } catch (error) {
    // Manejar errores inesperados
    errorHandler(error, req, res);
  }
};
export default getCompanies;
