import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import connectDB from "./connection/connect";
import router from "./routes/route";

config();
connectDB();
const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/store", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
