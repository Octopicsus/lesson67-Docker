import { Router } from "express";
import { ObjectId } from "mongodb";
import database from "../config/database.js";

const router = Router();

router.get("/", async (req, res) => {
  const courses = await database.getCollection('courses').find({}).toArray();
  res.json(courses);
});

router.get("/:id", async (req, res) => {
  const course = await database.getCollection('courses').findOne({ _id: new ObjectId(req.params.id) });
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

router.post("/", async (req, res) => {
  const { name, description, startDate, duration, instructor, maxStudents } = req.body;
  const newCourse = {
    name,
    description,
    startDate,
    duration,
    instructor,
    maxStudents: maxStudents ? parseInt(maxStudents) : 30,
    students: [],
    createdAt: new Date()
  };
  const result = await database.getCollection('courses').insertOne(newCourse);
  const createdCourse = await database.getCollection('courses').findOne({ _id: result.insertedId });
  res.status(201).json(createdCourse);
});

router.put('/assign-student/:courseId', async (req, res) => {
  const newStudentId = req.body.studentId;
  
  const result = await database.getCollection('courses').updateOne(
    { _id: new ObjectId(req.params.courseId) },
    { $push: { students: newStudentId } }
  );
  
  if (result.matchedCount === 0) return res.status(404).json({ error: "Course not found" });
  
  const updatedCourse = await database.getCollection('courses').findOne({ _id: new ObjectId(req.params.courseId) });
  res.json(updatedCourse);
});

router.put("/:id", async (req, res) => {
  const updateData = {};
  if (req.body.name) updateData.name = req.body.name;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.startDate) updateData.startDate = req.body.startDate;
  if (req.body.duration) updateData.duration = req.body.duration;
  if (req.body.instructor) updateData.instructor = req.body.instructor;
  if (req.body.maxStudents) updateData.maxStudents = parseInt(req.body.maxStudents);
  updateData.updatedAt = new Date();
  
  const result = await database.getCollection('courses').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) return res.status(404).json({ error: "Course not found" });
  
  const updatedCourse = await database.getCollection('courses').findOne({ _id: new ObjectId(req.params.id) });
  res.json(updatedCourse);
});

router.delete("/:id", async (req, res) => {
  const result = await database.getCollection('courses').deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Course not found" });
  res.status(204).send();
});

export default router;
