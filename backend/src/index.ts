import express from "express";
import cepRouter from "./route/postalCode.js";
import config from "./config/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/Query", cepRouter);

app.listen(config.server.port, () => {
  console.log(`Running in port ${config.server.port}`);
});
