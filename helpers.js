const EMAIL = process.env.EMAIL;

function generateEmail({ name, email, content }) {
  return {
    Source: EMAIL,
    Destination: { ToAddresses: [EMAIL] },
    ReplyToAddresses: [EMAIL],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Message sent from email ${email} by ${name} \n ${content}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `You received a message from your personal website!`
      }
    }
  };
}

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(payload)
  };
}

function generateError(code, err) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(err.message)
  };
}

module.exports = {
  generateEmail,
  generateResponse,
  generateError
};
