import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDb from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = dirname(__filename); // Get the current module's directory name

ConnectDb();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} on port ${process.env.PORT}`
      .bgCyan.white
  );
});
