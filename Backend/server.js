const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://kavi:EAUyTC79oZFqMLNF@cluster0.qqbgvgo.mongodb.net/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Student schema
const Student = mongoose.model('Student', {
    name: String,
    address: String,
    class: String,
    studentId: String,
    parentName: String
});

// Get students (with search)
app.get('/students', async (req, res) => {
    const { search = '' } = req.query;
    const filter = {
        $or: [
            { name: new RegExp(search, 'i') },
            { address: new RegExp(search, 'i') },
            { class: new RegExp(search, 'i') },
            { studentId: new RegExp(search, 'i') },
            { parentName: new RegExp(search, 'i') },
        ]
    };
    const students = await Student.find(filter);
    res.json(students);
});

// Post new student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add student', error });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
