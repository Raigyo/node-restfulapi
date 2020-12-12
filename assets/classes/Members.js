const { reject } = require("lodash");

let db, config

module.exports = (_db, _config) => {
  db = _db;
  config = _config;
  return Members; // return class
}

let Members = class {

  // GET - id
  static getByID(id) {

    return new Promise((next) => {
      db.query('SELECT * FROM members WHERE id = ?', [id])
      .then((result) => {
        if (result[0] != undefined)  // if ID exists
          next(result[0]);
        else
          next(new Error('Wrong id value'));
      })
      .catch((err) => next(err))
    })
  };// \GET - id

};// \Members