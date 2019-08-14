const appConfig = require('./config/appconfig')
const jobRoutes = require('./routes/jobRoutes');
const addGuidance = require('./routes/addGuidance');
const admin = require('./routes/admin');

/** * External Imports **/
const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')

const app = express();

const port = process.env.PORT || 3000
const dburl = process.env.MONGODB_URL || appConfig.db.url

/**
 * 
 * body parser for post methods 
 *  
 */ 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: false
}))

/**
 * 
 * Set header methods
 * 
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE");
  next();
})

/**
 * 
 * Load Routes
 */
app.use('/jobRoutes', jobRoutes);
// app.use('/addGuidance', addGuidance);
app.use('/admin', admin);




/**
 * 
 * Mongoose connect
 * 
 */
app.listen(port, () => {
  let db = mongoose.connect(dburl, ({
    useNewUrlParser: true,
    uri_decode_auth: true
  }))
})

/**
 * 
 * Mongoose connnection error
 */
mongoose.connection.on('error', function (err) {
  if (err) {
    console.log(err)
  }
})

/**
 * 
 * Mongoose connection open method
 * 
 */
mongoose.connection.on('open', function (err) {
  if (err) {
    console.log(err)

  } else {
    console.log('connection successful')
  }
})