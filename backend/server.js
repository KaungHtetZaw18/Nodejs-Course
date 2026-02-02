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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("App is running on localhost:" + process.env.PORT);
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

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
