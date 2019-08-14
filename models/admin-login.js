
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let adminLogin = new Schema({

    email: {
        type: String
    },
    password: {
        type: String
    },
})

mongoose.model('adminLogin', adminLogin)