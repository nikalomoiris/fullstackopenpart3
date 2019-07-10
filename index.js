require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('build'));

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
        "id": 5
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
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()));
    });
});

app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`)
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person.toJSON());
    })
})

app.delete('/api/persons/:id', (req, res) => {
    console.log('starting delete');
    const id = Number(req.params.id);
    console.log('got id', id);
    persons = persons.filter(person => person.id !== id)
    console.log('removed person', persons);

    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.phone) {
        return res.status(400).json({ error: 'missing name or phone number' });
    } else if (persons.map(person => person.name).includes(body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const person = new Person({
        name: body.name,
        phone: body.phone
    })
    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON());
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
