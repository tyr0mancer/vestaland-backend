import nodemailer from "nodemailer";
import config from "../../config";


export function sendMail(to: string, subject: string, text: string, html?: string) {

  const {host,port,user, pass} = config.smtp;

  const transporter = (config.smtpTest) ?
    nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'alberto.gutkowski66@ethereal.email',
        pass: 'VxkteYwMuFgpkbeRcE'
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
