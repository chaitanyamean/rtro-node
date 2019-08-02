
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let sample = new Schema({

    _id: {
        type: String
    },
    index: {
        type: String
    },
    guid: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    balance: {
        type: String
    }
})

mongoose.model('sample', sample)