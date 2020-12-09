require('babel-register');

console.log('begin');
  getMember((member) => {
    console.log(member);
    getArticles(member, (articles) => {
      console.log(articles);
    });
  });
console.log('end');

// callback
function getMember(next) {
  // we use set setTimeout to simulate a task
  setTimeout(() => {
    next('member 1');
  }, 1500)
}

function getArticles(member, next) {
  setTimeout(() => {
    next([1, 2, 3]);
  }, 1500)
}