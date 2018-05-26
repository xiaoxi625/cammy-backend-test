import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import boom from './lib/express-boom';
import { globalErrorMiddleware } from './lib/middleware/error';

export const appMiddleware = () => {
  return [
    boom(),
    cors(),
    compression(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    expressValidator(),
    globalErrorMiddleware
  ];
};
