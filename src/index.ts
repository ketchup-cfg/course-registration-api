import express from "express";
import coursesRouter from "./routes/courses";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/courses", coursesRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
