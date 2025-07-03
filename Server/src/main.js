import express from "express";
import cors from 'cors';
import database from "./config/database.js";
import coursesRouter from "./routes/courses.js";
import studentsRouter from "./routes/students.js";

const app = express();
app.use(express.json());
app.use(cors())

await database.connect();

app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);

export default app;