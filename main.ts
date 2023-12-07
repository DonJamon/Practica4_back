import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import postCompany from "./resolvers/postCompany.ts";
import postTask from "./resolvers/postTask.ts";
import postWorker from "./resolvers/postWorker.ts";

import {deleteCompany} from "./resolvers/deleteCompany.ts";
import {deleteTask} from "./resolvers/deleteTask.ts";
import {deleteWorker} from "./resolvers/deleteWorker.ts";

import getCompany from "./resolvers/getCompany.ts";
import getTask from "./resolvers/getTask.ts";
import getWorker from "./resolvers/getWorker.ts";

import getCompanies from "./resolvers/getCompanies.ts";
import getTasks from "./resolvers/getTasks.ts";
import getWorkers from "./resolvers/getWorkers.ts";


import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const mongo_usr: string | undefined = env.MONGO_USR ||
  Deno.env.get("MONGO_USR");
const mongo_pwd: string | undefined = env.MONGO_PWD ||
  Deno.env.get("MONGO_PWD");
const mongo_uri: string | undefined = env.MONGO_URI ||
  Deno.env.get("MONGO_URI");
const db_name: string | undefined = env.DB_NAME || Deno.env.get("DB_NAME");

if (!mongo_usr || !mongo_pwd || !mongo_uri || !db_name) {
  console.log("Missing env values");
  Deno.exit(1);
}

await mongoose.connect(
  `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?retryWrites=true&w=majority`,
);

const app = express();
app.use(express.json());
app
  .delete("/deleteCompany/:id", deleteCompany)
  .delete("/deleteTask/:id", deleteTask)
  .delete("/deleteWorker/:id", deleteWorker)
  .post("/postCompany", postCompany)
  .post("/postTask", postTask)
  .post("/postWorker", postWorker)
  .get("/getCompanies", getCompanies)
  .get("/getTasks", getTasks)
  .get("/getWorkers", getWorkers)
  .get("/getCompany/:id", getCompany)
  .get("/getTask/:id", getTask)
  .get("/getWorker/:id", getWorker)
  
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});