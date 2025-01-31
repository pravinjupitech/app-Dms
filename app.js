import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

import UserRouter from "./routers/user.route.js";
import ReceiptRouter from "./routers/receipt.route.js";
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public"
);

const publicPath1 = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "controller"
);
app.use(express.static(publicPath));
app.use(express.static(publicPath1));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/process", (req, res) => {
  res.send("server running!");
  process.exit();
});
app.use("/user", UserRouter);
app.use("/receipt", ReceiptRouter);

mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
