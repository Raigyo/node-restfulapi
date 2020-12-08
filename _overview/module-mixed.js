const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

  if (req.url == '/'){
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write("<h1>Home</h1\n");
    res.end();
  } else if (req.url == '/test'){
    fs.readFile('test.txt', 'utf-8', (err, data) => {
      if (err){
        send404(res);
      } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
  } else {
      send404(res);
  }
}).listen(8080)

const send404 = (res) => {
  res.writeHead(404, {'Content-type': 'text/html'});
  res.write("<span style='color: red'>Error 404</span>");
  res.end();
}