import express from 'express';
import controller from './controller';

const Email = express();
// Email
Email.post('/email', controller.sendEmail);

export default Email;
