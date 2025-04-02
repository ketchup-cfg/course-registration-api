import express from "express";
import coursesRouter from "./routes/courses";

const app = express();

app.use(express.json());
app.use("/courses", coursesRouter);

export default app;
