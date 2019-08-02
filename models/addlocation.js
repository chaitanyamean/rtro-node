
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let addLocations = new Schema({

    locationId: {
        type: String
    },
    location: {
        type: String
    },
})

mongoose.model('AddLocations', addLocations)