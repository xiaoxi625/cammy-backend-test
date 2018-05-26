import { globalSuccessResponse as success} from './../../handlers/response';
import config from './../../config';
import Db from './db.js';
import { v4 } from 'node-uuid';
import { validateEmail } from './../../utils/validation';

export default {
  /*
  * @api {post} /messages/ Persist message info DB
  * @apiName createMessage
  * @apiGroup Message
  */
  createMessage: async (req, res) => {
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

    const isValidEmail = validateEmail(req.body.email);
    if(!isValidEmail) {return res.boom.badRequest('Validation failed',{error: 'Email is invalid'}); }

    const uuid = v4();
    const date = new Date();
    let data = generateMessageData(req.body,uuid,date);
    try{
      await Db.createMessage(data);
    }catch(err){
      return res.boom.badRequest('failed to persist message');
    }
    return res.json(success(data));
  },

  /*
  * @api {get} /messages/?messageId=xxx-xxx-xxx-xxx Obtain one message from DB
  * @apiName getMessage
  * @apiGroup Message
  */
  getMessage: async (req, res) => {
    if (!req.params.messageId) { return res.boom.badRequest('Validation failed, please provide message id'); }
    try{
      const message = await Db.getMessage({uuid:req.params.messageId});
      if(message){
        return res.json(success(message));
      }else{
        return res.boom.notFound('No message under this id');
      }
    }catch(err){
      return res.boom.badRequest('failed to get the message');
    }
  },
}

export const generateMessageData = (data,uuid,date) => {
  return {
    uuid: uuid,
    name: data.name,
    mobile: data.mobile,
    email: data.email,
    details: data.details,
    subject: data.subject,
    createdTime: date,
  }
}
