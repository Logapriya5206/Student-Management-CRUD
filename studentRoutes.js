const express = require('express');
const router = express.Router();

// In-memory student list (multiple students already present)
let students = [
  { id: 1, name: "Arun", dept: "CSE", age: 23 },
  { id: 2, name: "Bala", dept: "ECE", age: 22 },
  { id: 3, name: "Priya", dept: "IT", age: 21 }
];

// READ – Get all students
router.get('/', (req, res) => {
  res.json(students);
});

// CREATE – Add single student
router.post('/', (req, res) => {
  const { name, dept, age } = req.body;

  if (!name || !dept || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const id = students.length
    ? students[students.length - 1].id + 1
    : 1;

  const newStudent = { id, name, dept, age };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// CREATE – Add multiple students (BULK)
router.post('/bulk', (req, res) => {
  const studentList = req.body;

  if (!Array.isArray(studentList)) {
    return res.status(400).json({ message: "Send array of students" });
  }

  studentList.forEach(student => {
    const id = students.length
      ? students[students.length - 1].id + 1
      : 1;

    students.push({
      id,
      name: student.name,
      dept: student.dept,
      age: student.age
    });
  });

  res.json({
    message: "Multiple students added successfully",
    students
  });
});

// UPDATE student
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, dept, age } = req.body;
  if (name) student.name = name;
  if (dept) student.dept = dept;
  if (age) student.age = age;

  res.json(student);
});

// DELETE student
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

module.exports = router;
