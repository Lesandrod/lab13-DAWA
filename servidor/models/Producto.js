const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    
    producto: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    ubicacion: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Producto', ProductoSchema)