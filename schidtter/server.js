// set consts for express environment, mongoclient, .env and PORT
const express = require('express'), 
        app = express(),
        MongoClient = require('mongodb').MongoClient,
        PORT = process.env.PORT || 8000
require('dotenv').config()

//connect to DB
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'schidtter'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology : true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

//set view engine to EJS, static public folder for CSS, IMG, and JS routing, init JSON method
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

//render ejs on load
app.get('/',(request,response) => {
        db.collection('schidtter').find().toArray()
        .then(data => {
                response.render('index.ejs', { info: data })
        })
        .catch(err => console.error(err))
})

//add a new post to the main page
app.post('/addPost', (request, response) => {
        db.collection('schidtter').updateOne(({}))
})
.then(result => {
        console.log('new post created')
        response.redirect('/')
})
.catch()
//adds one like to each post --- 
app.put('addOneLike', (request,response) => {
        db.collection('schidtter').updateOne({})
})
.then(result => {

})
.catch()


//need to add a downvote here






//delete to delete the post




//initiate server listening
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})
