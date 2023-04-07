const http = require("http");
const url = require("url");
const querystring = require("querystring");

// 修改成自己的 Token
const token = "YOUR_TOKEN";

const server = http.createServer((req, res) => {
  const query = querystring.parse(url.parse(req.url).query);

  if (query.signature && query.timestamp && query.nonce && query.echostr) {
    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const echostr = query.echostr;

    const arr = [token, timestamp, nonce];
    arr.sort();

    const tempStr = arr.join("");
    const sha1 = require("crypto").createHash("sha1");
    const sha1Result = sha1.update(tempStr).digest("hex");

    if (sha1Result === signature) {
      res.end(echostr);
    } else {
      res.end("Wrong signature");
    }
  } else {
    res.end("Hello world!");
  }
});

server.listen(80, () => {
  console.log("Server listening on port:", 80);
});
