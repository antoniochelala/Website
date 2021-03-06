console.log('Node JS is working')

//importing express, we need to import express in order to use app = express()
const express = require('express')
const app = express() //initializing APP


//Setting up MongoDB
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'onlinestore'


const path = require('path')
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Handlebars setup
const hbs = require('hbs')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setting up the Listening port
const port = process.env.PORT || 3000 //const for port
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Booking Website',
        name: 'Antonio Chelala'
    })
})

// Admin Page
app.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Admin',
        name: 'Antonio Chelala',
        helpText: "This is the Admin Page"
    })
})

//match anything that has not been matched so far => this is the meaning of the wildcard *
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Antonio Chelala',
        errorMessage: 'Page not found',
    })
})


//setting up MongoDB connection

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    console.log('Connected')

    const db = client.db(databaseName)
})