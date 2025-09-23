const fs = require("fs");

// // Reading files asynchronously
// fs.readFile("./docs/creativecoder.txt", (err, data) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(data.toString());
// });

// // // Writing files asynchronously
// if (!fs.existsSync("./docs/creativecoder123.txt")) {
//   fs.writeFile("./docs/creativecoder123.txt", "Hello World", (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log("after writing files");
//   });
// } else {
//   // Deleting files
//   fs.unlink("./docs/creativecoder123.txt", (err) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log("file deleted");
//   });
// }

if (fs.existsSync("./new-folder")) {
  // Deleting folders
  fs.rmdir("./new-folder", (err) => {
    if (err) {
      console.error(err);
    }
    console.log("folder deleted");
  });
} else {
  // Creating folders
  fs.mkdir("./new-folder", (err) => {
    if (err) {
      console.error(err);
    }
    console.log("folder created");
  });
}
