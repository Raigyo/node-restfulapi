const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err){
    console.log(err);
  } else {
    console.log(data);

    fs.writeFile('test.txt', 'Writing', 'utf-8', (err) => {
      // console.log(err);
      fs.readFile('test.txt', 'utf-8', (err, data) => {
        console.log(data);
      })
    })
  }
})
