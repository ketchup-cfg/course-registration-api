import express from "express";

const coursesRouter = express.Router();

coursesRouter.get("/", (_req, res) => {
  res.json({
    id: "1",
    courseNumber: "101",
    subject: "HIST",
    description: "Just a test HIST 101 course",
  });
});

export default coursesRouter;
