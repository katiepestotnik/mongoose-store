require('dotenv').config()
const express = require('express')
const app = express()
const Products = require('./models/products')
const MONGODB_URL=process.env.MONGODB_URL
const methodOverride = require('method-override')
const morgan = require('morgan')

const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect(MONGODB_URL)
db.on('connected', () => {
    console.log('mongo connected')
})
db.on('disconnected', () => {
    console.log('mongo disconnected')
})
db.on('error', (err) => {
    console.log(err)
})

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//home

//index

//new

//delete

//update

//create

//edit

//show



app.listen(3000, () => {
    console.log('Server on')
})