/**
 * Required External Modules
 */

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { errorHandler } from './middleware/error.middleware';
import sendReplyMail, { sendMailProps } from './nodemailer/sendMail';

const app = express();

// instantiate middlewares

app.set('view engine', 'ejs');
app.set('views', `${path.join(__dirname, 'views')}`);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.env.PWD as string, '/public')));

app.get('/', (req: Request, res: Response) => {
  return res.render('index');
});

app.post(
  '/api/reply',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        recipientName,
        recipientMail,
        recipientPhone,
        recipientOrganization,
        recipientMessage,
      }: sendMailProps = req.body;
      console.log(req.body);
      await sendReplyMail({
        recipientName,
        recipientMail,
        recipientPhone,
        recipientOrganization,
        recipientMessage,
      });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

/**
 *  App Error Handling
 */

app.use(errorHandler);

export default app;
