import express from 'express';
import controller from './controller';

const Message = express();
// Message
Message.post('/message', controller.createMessage);
Message.get('/message/:messageId', controller.getMessage);

export default Message;
