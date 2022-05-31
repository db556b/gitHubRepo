const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://db556b:%21Knuwme3131@starwars.nsatx.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString)
    .then(client=> {
        console.log('Connected to DB')
        const db = client.db('starWarsQuotes')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({extended: true}))

        app.get('/', (req,res)=> {
            res.sendFile(__dirname + '/index.html')
        })
        
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
               res.redirect('/')
                 })
                .catch(error => console.log(error))
        })
        app.listen(3000,function () {
            console.log('listening on 3000')
        })
    })


