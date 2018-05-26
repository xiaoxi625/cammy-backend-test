import express from 'express';
import email from './modules/email';
import message from './modules/message';
import { start } from './handlers/startup';
import { appMiddleware } from './middleware';
/*
 * Create express instance and setup middleware
 */
export const app = express(); //export for testing
app.use(appMiddleware());
/*
 * Register V1 modules
 */
let v1 = express.Router();
v1.use('/messages', message);
v1.use('/emails', email);
/*
 * Register the API
 */
app.use('/api/v1', v1);
/*
 * Start the server
 */
start(app);
