const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const recipesRoutes = require("./routes/recipes");
const cors = require("cors");
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

app.use(cors()); //local development --Warning--
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", recipesRoutes);
