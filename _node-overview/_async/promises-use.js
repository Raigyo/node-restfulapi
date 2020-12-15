require('babel-register');

console.log('Begin');

getMember()
  .then((member) => getArticles(member))
  .then((article) => console.log(article))
  .catch(err => console.log(err.message))

function getMember(next) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('member 1');
      resolve('member 1');
      // reject(new Error('Error during getMember'))
    }, 1500)
  })
}

function getArticles(member, next) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //console.log('[1, 2, 3]');
      resolve([1, 2, 3]);
    }, 1500)
  })
}

console.log('End');