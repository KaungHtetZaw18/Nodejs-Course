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
const sendEmail = require("./helpers/sendEmail");

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

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("email");
});

app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", usersRoutes);

app.get("/set-cookie", (req, res) => {
  // res.setHeader('Set-Cookie','name=kaunghtetzaw');
  res.cookie("name", "aungaung");
  res.cookie("important-key", "value", { httpOnly: true });
  return res.send("cookie already set");
});

app.get("/send-email", (req, res) => {
  sendEmail({
    view: "email",
    data: {
      name: "AungAung",
    },
    from: "mgmg@gmail.com",
    to: "aungaung@gmail.com",
    subject: "Hello AungAung",
  });
  return res.send("email already sent");
});

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
