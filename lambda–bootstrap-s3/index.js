const AWS = require('aws-sdk');
const response = require('cfn-response');
const axios = require('axios');

const s3 = new AWS.S3();
const destKey = "SalesData.csv"

exports.handler = function(event, context) {
    const bucket = event.ResourceProperties.bucketname;
    const assetBucket = "https://aws-jam-challenge-resources.s3.amazonaws.com/mongodb-data-lake"
    const dataSetNumber = Math.floor(Math.random() * 10);

    console.log(`Bucket: ${bucket}, dataSetNumber: ${dataSetNumber}`);
    axios.get(`${assetBucket}/SampleData${dataSetNumber}.csv`)
    .then (result => {
        console.log(`Axios fetched file`);
        return s3.putObject({Bucket: bucket, Key: destKey, Body: result.data}).promise();
    })
    .then(() => {
        const answers = [6631, 6861, 6934, 6873, 6655, 6767, 6941, 6944, 6690, 6801]
        var responseData = {bucket: bucket, dataSetNumber: dataSetNumber, correctAnswer: answers[dataSetNumber]};
        console.log("Success");
        response.send(event, context, response.SUCCESS, responseData);
    })
    .catch(error =>{
          const errorText = `Failed to copy file to ${bucket}/${destKey}: ${error}`
          console.log(errorText)
          response.send(event, context, response.FAILED, {Error: errorText})
    })
};