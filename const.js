var inputfile = require("./json/alljobs.json");
var bulk = [];

var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
    host:'localhost:9200'
})

client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
  });

var makebulk = function(constituencylist,callback){
  for (var current in constituencylist){
    bulk.push(
      { index: {_index: 'jobs', _type: '_doc', _id: constituencylist[current].jobId } },
      {
        'experience': constituencylist[current].experience,
        'skillSet': constituencylist[current].skillSet,
        'location': constituencylist[current].location,
        'jobTitle': constituencylist[current].jobTitle,
        'companyName': constituencylist[current].companyName,
        'mobileNumber': constituencylist[current].mobileNumber,
        'email': constituencylist[current].email,
        'image': constituencylist[current].image,
        'jobDescription': constituencylist[current].jobDescription
      }
    );
  }
  callback(bulk);
}

var indexall = function(madebulk,callback) {
  client.bulk({
    maxRetries: 5,
    index: 'jobdetails',
    type: 'typedetails',
    body: madebulk
  },function(err,resp,status) {
      if (err) {
        console.log(err);
      }
      else {
        callback(resp.items);
      }
  })
}

makebulk(inputfile,function(response){
  console.log("Bulk content prepared");
  indexall(response,function(response){
    console.log(response);
  })
});


