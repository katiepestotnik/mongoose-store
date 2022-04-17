const mongoose = require('mongoose')
const { Schema, model } = mongoose
const productsSchema = new Schema({
    name: {type: String, required:true},
    description: String,
    img: String,
    price: {type: Number, min:0},
    qty: {type:Number, min:0}
})

module.exports = mongoose.model("Products", productsSchema)