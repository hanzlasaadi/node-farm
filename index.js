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

const getTemplate = (obj, markup) => {
  let output = markup.replace(/{%IMAGE%}/g, obj.image);
  output = output.replace(/{%PRODUCTNAME%}/g, obj.productName);
  output = output.replace(/{%ID%}/g, obj.id);
  output = output.replace(/{%FROM%}/g, obj.from);
  output = output.replace(/{%QUANTITY%}/g, obj.quantity);
  output = output.replace(/{%NUTRIENTS%}/g, obj.nutrients);
  output = output.replace(/{%PRICE%}/g, obj.price);
  output = output.replace(/{%DESCRIPTION%}/g, obj.description);

  if (!obj.organic) output = output.replace(/{%ORGANIC%}/g, "not-organic");

  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf8"
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/template-cards.html`,
  "utf8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf8"
);

//Routes
const server = http.createServer((req, res) => {
  const reqPathName = req.url;
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
  const dataObj = JSON.parse(data);

  switch (reqPathName) {
    case "/":
    case "/home":
      const cards = dataObj
        .map((data) => getTemplate(data, tempCards))
        .join("");
      const output = tempOverview.replace("{%CARDS%}", cards);
      res.end(output);
      break;
    case "/product":
      res.end("You are on the product page.");
      break;
    case "/api":
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
        "my-own-header": "Fuck the world",
      });
      res.end("<h1>Page not found!</h1>");
      break;
  }
});

server.listen("8080", "127.0.0.1", () => {
  console.log("Started listening on port 8080");
});
