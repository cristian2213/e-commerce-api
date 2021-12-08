import { join } from 'path';
import sgMail from '@sendgrid/mail';
import htmlToText from 'html-to-text';
import juice from 'juice';
import pug from 'pug';
import envConfig from '../../../config/v1/env/env.config';
import config from '../../../config';
import {
  HTMLOptions,
  SendEmailOptions,
} from '../../../types/v1/email/email.type';

envConfig();
const configVariables = config();
sgMail.setApiKey(configVariables.sendGrid.SENDGRID_API_KEY);

const generateHTML = (file: string, options: HTMLOptions) => {
  const html = pug.renderFile(
    join(__dirname, '..', '..', 'views', 'emails', 'confirmAccount', file),
    options
  );
  return juice(html);
};

const sendEmail = async (options: SendEmailOptions) => {
  const { to, subject, file, htmlOptions } = options;

  // const html = generateHTML(file, htmlOptions);

  // const msg = {
  //   to,
  //   from: configVariables.sendGrid.SENDGRID_EMAIL_FROM,
  //   subject,
  //   text: htmlToText.htmlToText(html),
  //   // text: 'test1',
  //   html: '<h1>test1</h1>',
  // };

  // await sgMail.send(msg);
  // console.log(html);
};

export default { sendEmail, generateHTML };
