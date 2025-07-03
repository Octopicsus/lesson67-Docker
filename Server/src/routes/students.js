import { Router } from "express";
import { ObjectId } from "mongodb";
import database from "../config/database.js";

const router = Router();

router.get("/", async (req, res) => {
  const students = await database.getCollection('students').find({}).toArray();
  res.json(students);
});

router.get("/:id", async (req, res) => {
  const student = await database.getCollection('students').findOne({ _id: new ObjectId(req.params.id) });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

router.post("/", async (req, res) => {
  const { fullname, city, email, age } = req.body;
  const newStudent = { 
    fullname, 
    city, 
    email, 
    age: age ? parseInt(age) : undefined,
    createdAt: new Date()
  };
  const result = await database.getCollection('students').insertOne(newStudent);
  const createdStudent = await database.getCollection('students').findOne({ _id: result.insertedId });
  res.status(201).json(createdStudent);
});

router.put("/:id", async (req, res) => {
  const updateData = {};
  if (req.body.fullname) updateData.fullname = req.body.fullname;
  if (req.body.city) updateData.city = req.body.city;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.age) updateData.age = parseInt(req.body.age);
  updateData.updatedAt = new Date();
  
  const result = await database.getCollection('students').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) return res.status(404).json({ error: "Student not found" });
  
  const updatedStudent = await database.getCollection('students').findOne({ _id: new ObjectId(req.params.id) });
  res.json(updatedStudent);
});

router.delete("/:id", async (req, res) => {
  const result = await database.getCollection('students').deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Student not found" });
  res.status(204).send();
});

export default router;