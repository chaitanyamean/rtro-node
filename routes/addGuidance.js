

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
      email: req.body.email,
      description: req.body.description,
      candidateType: req.body.candidateType,
      canContactOn: req.body.canContactOn,
      time: req.body.time,
      date: req.body.date,
    })

    console.log(guidanceObj);
    
    try {
  
      let guidanceData = await guidanceObj.save();
  
      if (guidanceData) {
        // res.send(guidanceData)

        response.generate(false, 'Submitted successfully', 200, guidanceData)
        res.send(response.generate(false, 'Submitted successfully', 200, guidanceData))
      } else {
        res.send(response.generate(true, 'Unable to save, please try after some time', 400, null));
      }
    } catch (e) {
      res.send(response.generate(false, 'Error while saving', 500, null));


  
    }
  })

  module.exports = router;