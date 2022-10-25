require('dotenv').config()
const express = require('express')
const app = express()
const Product = require('./models/products')
const seedProducts = require('./models/seedProducts')
const MONGODB_URL=process.env.MONGODB_URL
const methodOverride = require('method-override')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001
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
    const {id}=req.params
    Product.findByIdAndDelete(id, (err, data) => {
        err?console.log('oops'):res.redirect('/products')
    })
})
//update with buy
app.put('/products/buy/:id', (req, res) => {
    const { id } = req.params
    Product.findByIdAndUpdate(id, req.body, (err, product) => {
        product.qty -= 1
        product.save()
        res.redirect(`/products/${id}`)
        })
    })


//update
app.put('/products/:id', (req, res) => {
    const {id}=req.params
    Product.findByIdAndUpdate(id, req.body, (err, product) => {
        res.redirect(`/products/${id}`)
    })
})
//create
app.post('/products', (req, res) => {
    Product.create(req.body, (err, product) => {
        res.redirect('/products')
    })
})
//edit
app.get('/products/:id/edit', (req, res) => {
    const {id}=req.params
    Product.findById(id, (err, product) => {
        res.render('edit.ejs', {product})
    })
})
//show
app.get('/products/:id', (req, res) => {
    const {id}=req.params
    Product.findById(id, (err, product) => {
        console.log(err)
        res.render('show.ejs', {product:product, id:req.params.id})
    })
})


app.listen(PORT, () => {
    console.log(`Server on ${PORT}`)
})