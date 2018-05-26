import { globalSuccessResponse as success} from './../../handlers/response';
import config from './../../config';
import { validateEmail } from './../../utils/validation';

const API_KEY = config.email.mailgun.key;
const DOMAIN = config.email.mailgun.domain;
const SENDER = config.email.sender.from;
const DEFAULT_EMAIL = config.email.sender.default_email;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});


export default {
  /*
  * @api {post} /email Send email to customer
  * @apiName sendEmail
  * @apiGroup Email
  */
  sendEmail: async (req, res) => {
    //Check request body
    req.checkBody({
      name: {
        notEmpty: true,
        optional: false,
        errorMessage: 'Name must be provided'
      },
      email: {
        notEmpty: true,
        optional: false,
        errorMessage: 'Email must be provided'
      },
      subject: {
        notEmpty: true,
        optional: false,
        errorMessage: 'Subject must be provided'
      },
      details: {
        notEmpty: true,
        optional: false,
        errorMessage: 'Details must be provided'
      },
    });
    if (req.validationErrors()) { return res.boom.badRequest('Validation failed', req.validationErrors()); }

    //Check email format
    const isValidEmail = validateEmail(req.body.email);
    if(!isValidEmail) {return res.boom.badRequest('Validation failed',{error: 'Email is invalid'}); }

    //sending email
    const sendingData = generateData(req.body, SENDER, DEFAULT_EMAIL);
    try{
      mailgun.messages().send(sendingData, function (error, body) {
        if(error){
          console.log(error);
          return res.boom.badRequest('failed to send email');
        }
        console.log(body);
        return res.json(success(body));
      });
    }catch(err){
      return res.boom.badRequest('failed to send email');
    }
  }
}

export const generateData = (data, sender,defaultEmail) => {
  return {
    from: `${sender}`,
    to: `${[defaultEmail,data.email]}`,
    subject: `${data.subject}`,
    text: `${data.details}`
  }
}
