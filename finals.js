const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());

let students = [];

app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send(student);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedStudent = req.body;
    let student = students.find(s => s.id === id);

    if (student) {
        Object.assign(student, updatedStudent);
        res.status(200).send(student);
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
        students.splice(index, 1);
        res.status(200).send({ message: 'Student deleted' });
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});