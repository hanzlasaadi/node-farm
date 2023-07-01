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

//----------------SERVER-----------------
const server = http.createServer((req,res) => {
  res.end("HELLO, from the dark side🌑");
  // console.log(res);
  // console.log(req);
})

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on port 8080");
});

//----------------Routing-----------------
const server = http.createServer((req,res) => {
  console.log(req.url)
  let pathname = req.url;
  
  if(pathname === "" || pathname === "/" || pathname === "/overview" ) {
    res.end("<h1>HELLO, from the dark side of OVERVIEW</h1>");
  }
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "header-type": "fucked header"
    })
    res.end("<h1>PAGE NOT FOUND</h1>");
  }
})

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on port 8080");
});
*/


//----------------API-----------------
// const data = fs.readFileSync("./dev-data/data.json");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`); // "__dirname" is the path of the where the index.js file is KEPT, not where it's RUNNING from
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
  console.log(req.url)
  let pathname = req.url;

  if(pathname === "" || pathname === "/" || pathname === "/overview" ) {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    // res.end(`<img src="./dev-data/hello.png" height=500px>`);
    // res.end(`./dev-data/hello.png`);
    // res.end(`HELLOOO`);
  }
  else if(pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json" //browser knows what to expect
    })
    res.end(data);
  }
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "header-type": "fucked header"
    })
    res.end("<h1>PAGE NOT FOUND</h1>");
  }
})
server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on port 8080");
});