const nodemailer = require("nodemailer");
const ejs = require("ejs");
let sendEmail = ({ view, data, from, to, subject }) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "42ce88383e7e58",
      pass: "81e41949e02a02",
    },
  });

  ejs.renderFile("./views/" + view + ".ejs", data, async (err, dataString) => {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: dataString,
    });

    console.log("Message sent:", info.messageId);
  });
};

module.exports = sendEmail;
