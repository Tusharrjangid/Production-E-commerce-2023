import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from "./route/userRoute.js";
import AdminRoute from "./route/adminRoute.js";
import DoctorRoute from "./route/doctorRoute.js";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = dirname(__filename); // Get the current module's directory name

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/doctor", DoctorRoute);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan
  );
});
