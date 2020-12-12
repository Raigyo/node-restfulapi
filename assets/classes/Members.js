let db, config

module.exports = (_db, _config) => {
  db = _db;
  config = _config;
  return Members; // return class
}

let Members = class {

}