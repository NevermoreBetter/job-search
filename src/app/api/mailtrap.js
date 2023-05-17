import nodemailer from "nodemailer";

export default function handler(req, res) {
  const body = req.body;

  const mailData = {
    from: "test@example.com",
    to: "test@example.com",
    subject: `New message from `,
    text: `1`,
    html: `<p>1</p>`,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dd4f1836aa62de",
      pass: "98a0ca670c25de",
    },
  });

  transport.sendMail(mailData, (error, info) => {
    if (error) console.log(error);
    console.log(`Message sent: ${info.messageId}`);
  });

  res.status(200).json({ body });
}
