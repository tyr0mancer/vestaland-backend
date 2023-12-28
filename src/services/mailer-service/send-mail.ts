import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export function sendMail(to: string, subject: string, text: string, html?: string) {

  const host = process.env.SMTP_HOST as string;
  const port = process.env.SMTP_PORT as unknown as number;
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;

  console.log("smtpt test", process.env.SMTP_TEST)

  const transporter = (process.env.SMTP_TEST === "1") ?
    nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'harmon.lynch73@ethereal.email',
        pass: 'QCZxuEk2WQxS1vf2kS'
      }
    })
    :
    nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {user, pass},
      tls: {
        rejectUnauthorized: false
      }
    });


  return new Promise(async (resolve, reject) => {
    transporter
      .sendMail({
        from: '"Team Vestaland 🍽" <team@vestaland.de>',
        to,
        subject,
        text,
        html
      })
      .then(resolve)
      .catch(reject)
  })
}
