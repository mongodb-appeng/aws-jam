'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  // Available data provided in the event
  const {
    eventTitle = null,
    challengeTitle = null,
    taskTitle = null,
    teamDisplayName = null,
    userInput = null, // <-- userInput only available if using the Lambda With Input validation type
    stackOutputParams = {}, // <-- a key/value map of the output params from the CloudFormation stack
  } = event;

  let completed = false;
  let message = 'Not yet completed';
  let progress = 0;
  const bucketName = stackOutputParams['bucketName'];
  console.log(`User input: ${userInput} – Actual bucket name: ${bucketName}`)
  if (userInput === bucketName) {
      message = `Correct - your bucket name is ${bucketName}. Make a note of this as you'll need it in later challenges`
      progress = 100
      completed = true
  } else {
      message = "That's not the correct bucket name"
  }

  return {
    completed, // required: whether this task is completed
    message, // required: a message to display to the team indicating progress or next steps
    progressPercent: progress // optional: any whole number between 0 and 100
  }
};