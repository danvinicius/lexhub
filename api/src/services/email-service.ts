import nodemailer, { Transporter } from 'nodemailer';

export class EmailService {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: Number(process.env.MAILTRAP_PORT),
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      });
  }
  public async send(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
