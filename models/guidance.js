
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
    candidateType: {
        type: String
    },
    canContactOn: {
        type: Array
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    guidanceId: {
        type: String
    }
})

mongoose.model('AddGuidance', addGuidance)