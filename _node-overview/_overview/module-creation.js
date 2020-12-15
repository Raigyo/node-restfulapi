const modCreat = require('./module-created'); // path to module
const modCreat2 = require('module-created2'); // path to node_modules

modCreat.sayHello();
modCreat.sayHi();

console.log(modCreat.hello);

modCreat2.sayHello();
modCreat2.sayHi();

console.log(modCreat2.hello);