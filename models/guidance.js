
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let addGuidance = new Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    description: {
        type: String
    },
    isUser: {
        type: String
    },
    canContactOn: {
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: String
    }
})

mongoose.model('AddGuidance', addGuidance)