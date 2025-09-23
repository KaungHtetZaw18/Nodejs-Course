const fs = require("fs");

const readStream = fs.createReadStream("./docs/large.txt");
const writeStream = fs.createWriteStream("./docs/large-copy.txt");

// //pipe
// readStream.on("data", (data) => {
//   writeStream.write(data.toString());
//   writeStream.write("--- chunk ---");
// });

readStream.pipe(writeStream);
