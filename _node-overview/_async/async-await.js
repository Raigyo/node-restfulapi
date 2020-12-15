require('babel-register');

console.log('Begin');

// (() => {
//   console.log('Middle');
// })();

(async () => {
  console.log('Middle');
  try {
    let member = await getMember();
    let articles = await getArticles();
    console.log(member + '/' + articles);
  } catch (err) {
    console.log(err.message);
  }
})();

// async function viewArticles(){
//   let member = await getMember();
//   let articles = await getArticles();
//   console.log(member + '/' + articles);
// };

// viewArticles();

function getMember() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('member 1');
    }, 1500)
  })
};

function getArticles(member, next) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3]);
    }, 1500)
  })
};

console.log('End');