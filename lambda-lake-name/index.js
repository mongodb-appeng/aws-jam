'use strict';

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
  console.log(`Provided Data Lake name: ${userInput}`)
  if (userInput != null && userInput != "") {
      progress = 100
      completed = true
      console.log("Name provided")
  } else {
      message = "Give me a real name"
  }

  return {
    completed, // required: whether this task is completed
    message, // required: a message to display to the team indicating progress or next steps
    progressPercent: progress // optional: any whole number between 0 and 100
  }
};