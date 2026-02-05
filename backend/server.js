const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const cron = require("node-cron");
let User = require("./models/User");
const nodemailer = require("nodemailer");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("App is running on localhost:" + process.env.PORT);
      cron.schedule("*/4 * * * * *", async () => {
        let user = await User.findByIdAndUpdate("698030f98ba1d32c3295298e", {
          name: "mgmg" + Math.random(),
        });
      });
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
); //local development --Warning--
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", usersRoutes);

app.get("/set-cookie", (req, res) => {
  // res.setHeader('Set-Cookie','name=kaunghtetzaw');
  res.cookie("name", "aungaung");
  res.cookie("important-key", "value", { httpOnly: true });
  return res.send("cookie already set");
});

app.get("/send-email", async (req, res) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "42ce88383e7e58",
      pass: "81e41949e02a02",
    },
  });
  const info = await transporter.sendMail({
    from: "mgmg@gmail.com",
    to: "kaunghtetzaw@gmail.com",
    subject: "Hello This is email title",
    html: "<b>Hello world this is email to kaung htet zaw</b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
  return res.send("email already sent");
});

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
