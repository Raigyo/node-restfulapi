require('babel-register');

console.log('Begin');

let p1 = new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1500)
})

let p2 = new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 1500)
})

// Wait that all the promises are finished
Promise.all([p1, p2])
.then(result => console.log(result))

// Display the result of the first promise that resolved its request
Promise.race([p1, p2])
.then(result => console.log(result))

console.log('End');