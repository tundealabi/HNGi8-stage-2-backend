import config from 'config';
import nodemailer from 'nodemailer';
console.log('hi from nodemail connect');
const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: config.get('nodemailer.mailServerUser'),
    pass: config.get('nodemailer.mailServerPass'),
    clientId: config.get('nodemailer.mailServerOauthClientId'),
    clientSecret: config.get('nodemailer.mailServerOauthClientSecret'),
    refreshToken: config.get('nodemailer.mailServerOauthRefreshToken'),
    accessToken: config.get('nodemailer.mailServerOauthAccessToken'),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
