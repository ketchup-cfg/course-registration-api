import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
