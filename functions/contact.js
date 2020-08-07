require('dotenv').config();

exports.handler = (event, _context, callback) => {
  const mailgun = require('mailgun-js');
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  
  const data = JSON.parse(event.body);
  console.log("data",data)
  
  console.log("data",data)
  const email = {
    from: 'wengellen<vidkue@gmail.com>',
    to: `${data.name} <${data.email}>`,
    subject: data.subject,
    text: data.body,
    message: data.attachment
  };
  
  mg.messages().send(email, (error, response) => {
    callback(error, {
      statusCode: 200,
      body: JSON.stringify(response)
    });
  });
};
