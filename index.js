const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejye6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express();

app.use(bodyParser.json());
app.use(cors());


const port = 3100;
app.get('/', (req, res) => {
    res.send("Thanks calling me")
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventsCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_NAME}`);
    app.post('/addevents', (req, res) => {
        const event = req.body;
        eventsCollection.insertOne(event)
            .then(result => {
                console.log(result.insertedCount)
                res.sendStatus(result.insertedCount)
            })
    })


    const registersCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_REGISTER}`);
    app.post('/addregisters', (req, res) => {
        const register = req.body;
        registersCollection.insertOne(register)
            .then(result => {
                console.log(result.insertedCount)
                res.sendStatus(result.insertedCount)
            })
    })
    app.get('/event-registers', (req, res) => {
        registersCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })


    app.get('/events', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        registersCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(  result => {
            console.log(result);
        })
    })
    
    app.delete('/deleteRegistry/:id', (req, res) => {
        registersCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(  result => {
            console.log(result);
        })
    })




});






app.listen(port);