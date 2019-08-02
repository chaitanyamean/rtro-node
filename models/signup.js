// {username: "admin", password: "1234"}\\

const mongoose = require('mongoose')

const Schema = mongoose.Schema


let user = new Schema({

    email: {
        type: String,
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    userId: {
        type: String
    }
})

mongoose.model('User', user)

