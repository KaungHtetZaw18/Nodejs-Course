const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const recipesRoutes = require("./routes/recipes");

const app = express();

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

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", recipesRoutes);
