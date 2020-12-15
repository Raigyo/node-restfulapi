require('babel-register');

console.log('Begin');

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('All good');
    // reject(new Error('Error...'));
  }, 1500)
})
.then((message) => console.log(message))
.catch((err) => console.log(err.message));

console.log('End');