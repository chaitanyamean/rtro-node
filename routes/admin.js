const express = require('express')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const router = express.Router()
const AWS = require('aws-sdk')
const config = require('../config/appconfig')


const response = require('../libs/responseLibs')

const adminLogin = require('../models/admin-login')
const AdminLoginModel = mongoose.model('adminLogin')

const checkAuth = require('../middleware/check-auth')



/**
 * 
 * 
 * Add Job post method
 * 
 * 
 */
router.post('/login', async (req, res) => {

  try {
  const userDetails = await AdminLoginModel.findOne({
    email: req.body.email
  })
  if (!userDetails) {
    let apiResponse = response.generate(true, 'No User Found', 400, null);
    return res.send(apiResponse);
  }

  try {

  console.log('userdetails', userDetails);
  let comparePassowrd = await bcryptjs.compare(req.body.password, userDetails.password)
  console.log('comparePassowrd', comparePassowrd);

  if (!comparePassowrd) {
    let apiResponse = response.generate(true, 'Password is wrong', 400, null);
    return res.send(apiResponse);
  }

  let token = await jwt.sign({
    email: req.body.email
  }, 'thisistheverybigsecretpassword')
  console.log('token', token);

  if (token) {
    let response = {
      'token': token,
      'userDetails': userDetails
    }
    console.log('response', response);

    let resObj = {
      message: 'Login Successful',
      status: 200,
      error: null,
      token: token,
      result: userDetails
    }
    return res.send(resObj)
  } else {
    let apiResponse = response.generate(true, 'unable to generate token', 400, response);
    res.send(apiResponse);
  }

  } catch (error) {
    console.log('Password trycatch');
  }
  } catch (error) {
    console.log('Find userdetails');

  }
})

router.post('/admin-signup', async (req, res) => {


  try {
    const userDetails = await AdminLoginModel.findOne({
      email: req.body.email
    })

    if (userDetails) {
      let apiResponse = response.generate(true, 'User already exists', 400, null);
      return res.send(apiResponse);
    }

    const bcryptPassword = await bcryptjs.hash(req.body.password, 10)

    if (bcryptPassword) {

      let adminLogin = new AdminLoginModel({
        email: req.body.email,
        password: bcryptPassword,
      })

      try {
        let adminDetailsSave = await adminLogin.save();

        if (adminDetailsSave) {
          let apiResponse = response.generate(false, 'User Details', 200, adminDetailsSave);
          return res.send(apiResponse);
        } else {
          let apiResponse = response.generate(false, 'Unable to create', 400, null);
          return res.send(apiResponse);
        }

      } catch (error) {
        let apiResponse = response.generate(false, 'Some thing went wrong', 500, null);
        return res.send(apiResponse);
      }
    }

  } catch (error) {

  }

})

module.exports = router;