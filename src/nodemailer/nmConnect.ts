import config from 'config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    type: 'OAuth2',
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
} as SMTPTransport.Options);

export default transporter;
