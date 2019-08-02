
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let constituencies = new Schema({

    PANO: {
        type: Number
    },
    ConstituencyName: {
        type: String
    },
    ConstituencyID: {
        type: String
    },
    ConstituencyType: {
        type: String
    },
    Electorate: {
        type: Number
    },
    ValidVotes: {
        type: Number
    },
    field7: {
        type: String
    },
    RegionID: {
        type: String
    },
    County: {
        type: String
    },
    Region: {
        type: String
    },
    Country: {
        type: String
    }
})

mongoose.model('constituencies', constituencies)