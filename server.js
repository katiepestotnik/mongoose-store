require('dotenv').config()
const express = require('express')
const app = express()
const Product = require('./models/products')
const seedProducts = require('./models/seedProducts')
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

//seed
app.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (err, deletedProducts) => {
        Product.create(seedProducts, (err, products) => {
            res.redirect('/products')
        })
    })
})

//home
app.get('/', (req, res) => {
    res.render('home.ejs', )
})
//index
app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
        res.render('index.ejs', { products:products})
    })
})
//new
app.get('/products/new', (req, res) => {
    res.render('new.ejs')
})
//delete
app.delete('/products/:id', (req, res) => {
    res.send('delete')
})
//update
app.put('/products/:id', (req, res) => {
    res.send('put')
})
//create
app.post('/products', (req, res) => {
    res.send('post')
})
//edit
app.get('/products/:id/edit', (req, res) => {
    res.render('edit.ejs')
})
//show
app.get('/products/:id', (req, res) => {
    res.render('show.ejs')
})


app.listen(3000, () => {
    console.log('Server on')
})