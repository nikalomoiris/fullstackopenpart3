const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0-jzxa8.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true }).catch(message => {
    console.log('Connection failed', message);
});

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook:");
        result.forEach(person => {
            console.log(`${person.name} ${person.phone}`);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        phone: process.argv[4]
    });

    person.save().then(response => {
        console.log(`added ${person.name} number ${person.phone} to phonebook`);
        mongoose.connection.close();
    })
}