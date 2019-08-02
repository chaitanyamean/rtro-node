
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let addJob = new Schema({

    experience: {
        type: Number
    },
    skillSet: {
        type: Array
    },
    location: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    companyName: {
        type: String
    },
    jobId: {
        type: String
    }
})

mongoose.model('AddJob', addJob)