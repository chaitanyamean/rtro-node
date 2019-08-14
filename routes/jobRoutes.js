/**External Imports */
const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const router = express.Router();
const AWS = require("aws-sdk");
const config = require("../config/appconfig");

/**Internal Imports */
const fs = require("fs");
const jobtags = require("../models/addJob");
const AddJobsModel = mongoose.model("AddJob");
const addSkills = require("../models/addSkills");
const AddSkillsModel = mongoose.model("AddSkills");
const addLocation = require("../models/addlocation");
const AddLocationModel = mongoose.model("AddLocations");
const sample = require("../models/sample");
const sampleModal = mongoose.model("sample");
const constituencies = require("../models/constituencies");
const constituenciesModal = mongoose.model("constituencies");
const response = require("../libs/responseLibs");

/**
 *
 * Elastic search connection
 */
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host:
    "https://site:0bc25b65fa425f5fad0303ec737d637b@thorin-us-east-1.searchly.com"
  // host: 'http://localhost:9200'
});

/**
 * Cliuster Health
 *
 */
client.cluster.health({}, function(err, resp, status) {
  console.log("health resp", resp);
  console.log("health status", status);
});

// client.indices.create({
//   index: 'jobs'
// }, function(err, resp, status) {
//   if (err) {
//       console.log(err);
//   } else {
//       console.log("create", resp);
//   }
// });

/**
 *
 * AWS S3 configuration
 */
const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  ignatureVersion: "v4",
  region: "ap-south-1"
});

/**
 *
 * Save Image in AWS S3 bucket
 */
router.get("/", (req, res) => {
  const key = `${shortid.generate()}.jpg`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "my-app-123",
      ContentType: "image/jpeg",
      Key: key
    },
    (err, url) => {
      res.send({
        key,
        url
      });
    }
  );
});

/**
 *
 *
 * Add Job post method
 *
 *
 */
router.post("/addjob", async (req, res) => {
  let jobId = shortid.generate();
  let jobDetails = new AddJobsModel({
    jobId: jobId,
    experience: req.body.experience,
    skillSet: req.body.skillSet,
    location: req.body.location,
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    image: req.body.image,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    companyName: req.body.companyName
  });
  try {
    const jobData = await jobDetails.save();

    client.index(
      {
        index: "jobs",
        id: jobId,
        type: "_doc",
        body: req.body
      },
      function(err, resp, status) {
        console.log(resp);
      }
    );

    if (jobData) {
      res.send(jobData);
    }
  } catch (e) {
    res.send("Unable to add the Job Details");
  }
});

/**
 *
 *
 * Add Skills
 *
 *
 */
router.post("/addSkills", async (req, res) => {
  let skills = new AddSkillsModel({
    skillId: shortid.generate(),
    skill: req.body.skill
  });
  try {
    let skillData = await skills.save();

    if (skillData) {
      res.send(skillData);
    }
  } catch (e) {
    res.send("Unable to add the Skill Details");
  }
});

/**
 *
 * Add Location
 *
 */
router.post("/addLocation", async (req, res) => {
  let location = new AddLocationModel({
    locationId: shortid.generate(),
    location: req.body.location
  });
  try {
    let locData = await location.save();
    if (locData) {
      res.send(locData);
    }
  } catch (e) {
    res.send("Unable to add the Location Details");
  }
});
/**
 *
 * Get skill and location data
 *
 */
router.get("/skillsandlocation", async (req, res) => {
  try {
    let skill = await AddSkillsModel.find();

    let location = await AddLocationModel.find();

    res.send({
      skills: skill,
      location: location
    });
  } catch (e) {
    res.send("Unable to add the Location Details");
  }
});

/*
 *
 *
 * Get Mobile View
 *
 */
router.get("/getMobileView/:id", async (req, res) => {
  try {
    let getData = await AddJobsModel.find({
      jobId: req.params.id
    });
    if (getData) {
      res.send(getData);
    }
  } catch (e) {
    res.send("Unable to get data");
  }
});

/**
 *
 * Search jobs
 *
 */
router.post("/getSearchList", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.skillSet);

    resArray = [];
    client.search(
      {
        index: "jobs",
        type: "_doc",
        body: {
          query: {
            bool: {
              must: {
                terms: {
                  "skillSet.skill.keyword": req.body.skillSet
                }
              },
              should: [
                {
                  term: {
                    "location.keyword": req.body.location
                  }
                },
                {
                  term: {
                    "experience:": req.body.experience
                  }
                }
              ]
            }
          }
        }
      },
      function(error, response, status) {
        if (error) {
          console.log("search error: " + error);
        } else {
          response.hits.hits.forEach(function(hit) {
            resArray.push(hit._source);
          });
          res.send({
            count: response.hits.total,
            status: "success",
            resArray: resArray
          });
        }
      }
    );
  } catch (e) {
    res.send("Unable to get data");
  }
});

router.get("/getAlljobs", async (req, res) => {
  try {
    let allJobs = await AddJobsModel.find();

    if (allJobs) {
      let apiResponse = response.generate(false, "All job list", 200, allJobs);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, "No Jobs Data", 400, null);
      res.send(apiResponse);
    }
    console.log(apiResponse);
  } catch (e) {
    let apiResponse = response.generate(
      true,
      "something went wrong",
      500,
      null
    );
    res.send(apiResponse);
  }
});

router.delete("/deleteJobById/:id", async (req, res) => {
  try {
    let deletedJobDetails = await AddJobsModel.deleteOne({
      jobId: req.params.id
    });

    if (deletedJobDetails) {

      client.delete(
        {
          index: "jobs",
          id: req.params.id,
          type: "_doc"
        },
        function(err, resp, status) {
          console.log(resp);
        }
      );

      
      let apiResponse = response.generate(
        false,
        "deleted Successfully",
        200,
        null
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        true,
        "Problem in deleting jobs",
        400,
        null
      );
      res.send(apiResponse);
    }
  } catch (error) {
    console.log("deleted job details");
  }
});

module.exports = router;
