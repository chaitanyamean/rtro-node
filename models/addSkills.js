
const mongoose = require('mongoose')

const Schema = mongoose.Schema


let addSkills = new Schema({

    skillId: {
        type: String
    },
    skill: {
        type: String
    },
})

mongoose.model('AddSkills', addSkills)