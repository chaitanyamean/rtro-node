

const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')

const router = express.Router()


const jobtags = require('../models/guidance')
const AddGuidanceModel = mongoose.model('AddGuidance')

const response = require('../libs/responseLibs')

/**
 * 
 * 
 * Add Guidance
 * 
 * 
 */
router.post('/addGuidance', async (req, res) => {

    let guidanceObj = new AddGuidanceModel({
      guidanceId: shortid.generate(),
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      description: req.body.description,
      isUser: req.body.isUser,
      canContactOn: req.body.canContactOn,
      time: req.body.time,
      date: req.body.date,
    })
    try {
  
      let guidanceData = await guidanceObj.save();
  
      if (guidanceData) {
        res.send(guidanceData)
      }
    } catch (e) {
      res.send('Unable to add the Skill Details')
  
    }
  })