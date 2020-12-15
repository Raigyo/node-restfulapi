const http = require('http');

http.createServer((req, res) => {

  if (req.url == '/'){
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.write("<h1>Home</h1\n"); // send response
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.write("<span style='color: red'>Error 404</span>")
  }

  // res.write(req.url);
  res.end(); // end sending
}).listen(8080)