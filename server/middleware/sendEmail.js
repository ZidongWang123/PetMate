import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { Sender, HOST, PASS } = process.env;
export default async function requestEmail(email, title, content) {
  let transporter = nodemailer.createTransport({
    host: HOST, // smtp host adress
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: Sender, // sender address
      pass: PASS, // smtp authorization code
    },
    connectionTimeout: 5 * 60 * 1000,
  });
  // define the transporter object to send email
  let info = await transporter.sendMail({
    from: Sender, // sender address
    to: email, // receiver address
    subject: title, // Subject of email 
    text: content,//content of email 
  });
}
