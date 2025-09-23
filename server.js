const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let fileName;
  switch (req.url) {
    case "/":
      fileName = "index.html";
      break;
    case "/contact":
      fileName = "contact.html";
      break;
    case "/about":
      fileName = "about.html";
      break;
    default:
      fileName = "404.html";
      break;
  }

  res.setHeader("Content-Type", "text/html");
  fs.readFile("./views/" + fileName, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server listening on port 3000");
});
