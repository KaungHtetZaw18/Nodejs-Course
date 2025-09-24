const express = require("express");
let morgan = require("morgan");

const app = express();

//db url
let mongoUrl =
  "mongodb+srv://Kaung_Htet_Zaw:Kaung@1822002@cluster0.mxbrmhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let blogs = [
    { title: "Blog title 1", intro: "This is blog intro 1" },
    { title: "Blog title 2", intro: "This is blog intro 2" },
    { title: "Blog title 3", intro: "This is blog intro 3" },
  ];
  res.render("home", { blogs, title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
