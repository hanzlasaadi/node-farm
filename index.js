const fs = require("fs");
const http = require("http");
const url = require("url");

/*
//-------------Files---------------
// syncronous way of reading and writing files
const textIn = fs.readFileSync("./txt/input.txt", "utf8");
const textOut = `Output text: ${textIn} & created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("Task Completed with: ", textOut);

// Async way of ...
fs.readFile("./txt/start.txt", "utf8", (err, data1) => {
  if (err) return console.log("Error 1");
  fs.readFile(`./txt/${data1}.txt`, "utf8", (err, data2) => {
      if (err) return console.log("Error 2");
      fs.readFile("./txt/append.txt", "utf8", (err, data3) => {
          if (err) return console.log("Error 3");
          console.log(`Append.txt: ${data2}\n${data3}`);
        });
    });
});

console.log("Reading files...");

//Server
const server = http.createServer((req, res) => {
  res.end("Helloo, from the other side...");
});

server.listen("8080", "127.0.0.1", () => {
  console.log("Started listening on port 8080");
});
*/

//Routes
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const reqPathName = req.url;

  switch (reqPathName) {
    case "/":
    case "/home":
      res.end("You are on home page.");
      break;
    case "/product":
      res.end("You are on the product page.");
      break;
    default:
      res.end("Page not found!");
      break;
  }
  //   res.end("Routing!");
});

server.listen("8080", "127.0.0.1", () => {
  console.log("Started listening on port 8080");
});
