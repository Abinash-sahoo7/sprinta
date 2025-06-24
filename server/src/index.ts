import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
// RoUTE IMPORT
import projectRoutes from "./routes/projectRoutes";
import taskRouter from "./routes/taskRouter";
import searchRouter from "./routes/serachRoutes";
import userRouter from "./routes/userRoutes";
import teamRouter from "./routes/teamRoutes";

// CONFIGURATION SETUP
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTE SETUP
app.use("/projects", projectRoutes);
app.use("/tasks", taskRouter);
app.use("/search", searchRouter);
app.use("/users", userRouter);
app.use("/teams", teamRouter);

app.use("/", (req, res) => {
  res.send("This is home route");
});

// SERVER SETUP
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port : ${port}`);
});
