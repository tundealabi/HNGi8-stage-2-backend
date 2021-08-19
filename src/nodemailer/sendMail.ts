import config from 'config';
import path from 'path';
import transporter from './nmConnect';

export type sendMailProps = {
  recipientName: string;
  recipientMail: string;
  recipientPhone: string;
  recipientOrganization: string;
  recipientMessage: string;
};

const sendReplyMail = async ({
  recipientMail,
  recipientName,
  recipientOrganization,
  recipientPhone,
  recipientMessage,
}: sendMailProps) => {
  await transporter.sendMail({
    from: config.get('nodemailer.emailFrom'),
    to: config.get('nodemailer.mailServerUser'),
    subject: 'Hi, Jake - Incoming message. Cheers!!',
    text: 'Hi, Jake - Incoming message. Cheers!!',
    html: `<div>
                <h3>New Message</h3>
                <br />
                <p>Name: ${recipientName}</p>
                <p>Email: ${recipientMail}</p>
                <p>Phone: ${recipientPhone}</p>
                <p>Organization: ${recipientOrganization}</p>
                <p>Message: ${recipientMessage}</p>
            </div>`,
  });
  await transporter.sendMail({
    from: config.get('nodemailer.emailFrom'),
    to: recipientMail,
    subject: 'Tunde Alabi - Fullstack Developer',
    text: 'Tunde Alabi - Fullstack Developer',
    html: `<div>Hi, <span style="color: #10b2fe; font-weight: bold" >${recipientName}</span>. Got your message and will get back to you shortly. Cheers!!!</div>`,
    attachments: [
      {
        path: path.join(
          process.env.PWD as string,
          '/public/assets/tunde-resume-cv.pdf'
        ),
      },
    ],
  });
  console.log('hi from sendmail');
};

export default sendReplyMail;
