const express = require('express');
const app = express();

let persons = [
    {
        "name": "Ada Lovelace",
        "phone": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "phone": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Nikos Kalomiris",
        "phone": "39-23-6423123",
        "id": 4
    },
    {
        "name": "dfdok",
        "phone": "23244",
        "id": 9
    },
    {
        "name": "a",
        "phone": "4444",
        "id": 10
    },
    {
        "name": "b",
        "phone": "222",
        "id": 11
    },
    {
        "name": "c",
        "phone": "333",
        "id": 12
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});