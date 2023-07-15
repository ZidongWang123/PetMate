import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
const {Sender,HOST,PASS} = process.env;
console.log(Sender,HOST,PASS);
export default   async function requestEmail(email,title,content) {

  let transporter = nodemailer.createTransport({
    host: HOST, // 第三方邮箱的主机地址
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: Sender, // 发送方邮箱的账号
      pass: PASS, // 邮箱授权密码
    },
    connectionTimeout: 5 * 60 * 1000
  });
  console.log("登录成功");
  // 定义transport对象并发送邮件
  let info = await transporter.sendMail({
    from: Sender, // 发送方邮箱的账号
    to: email, // 邮箱接受者的账号
    subject: title, // Subject line
    text: content
  });
  console.log(email);
  console.log("发送成功");
}