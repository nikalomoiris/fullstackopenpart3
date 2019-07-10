require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

let persons = [
    {
        'name': 'Ada Lovelace',
        'phone': '39-44-5323523',
        'id': 2
    },
    {
        'name': 'Dan Abramov',
        'phone': '12-43-234345',
        'id': 3
    },
    {
        'name': 'Mary Poppendieck',
        'phone': '39-23-6423122',
        'id': 4
    },
    {
        'name': 'Nikos Kalomiris',
        'phone': '39-23-6423123',
        'id': 5
    },
    {
        'name': 'dfdok',
        'phone': '23244',
        'id': 9
    },
    {
        'name': 'a',
        'phone': '4444',
        'id': 10
    },
    {
        'name': 'b',
        'phone': '222',
        'id': 11
    },
    {
        'name': 'c',
        'phone': '333',
        'id': 12
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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON());
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
})

app.post('/api/persons', (req, res, next) => {
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
        .catch(error => next(error));
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
