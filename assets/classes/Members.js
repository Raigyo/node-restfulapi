const { reject } = require("lodash");

let db, config

module.exports = (_db, _config) => {
  db = _db;
  config = _config;
  return Members; // return class
}

let Members = class {

  // GET - id
  /*Static class methods are defined on the class itself.
  You cannot call a static method on an object, only on an object class.*/
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

  // GET - all
  static getAll(max) {

    return new Promise((next) => {
      if (max != undefined && max > 0) {
        db.query('SELECT * FROM members LIMIT 0, ?', [parseInt(max)])
          .then((result) => next(result))
          .catch((err) => next(err))
      } else if (max != undefined) {
          next(new Error('Wrong max value'));
      } else {
          db.query('SELECT * FROM members')
          .then((result) => next(result))
          .catch((err) => next(err))
      }
    })

  };// \GET - all

};// \Members