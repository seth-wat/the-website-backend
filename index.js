const aws = require("aws-sdk");
const ses = new aws.SES();
const { generateEmail, generateResponse, generateError } = require("./helpers");

module.exports.send = async event => {
  try {
    const body = JSON.parse(event.body);
    const emailParams = generateEmail(body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data);
  } catch (err) {
    return generateError(500, err);
  }
};
