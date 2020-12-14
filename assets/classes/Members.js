const uuid = require('uuid/v1');

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

    return new Promise((next) => { // send promise to get a member by ID
      db.query('SELECT * FROM members WHERE id = ?', [id])
      .then((result) => { // retrieve and send object
        if (result[0] !== undefined)  // if ID exists
          next(result[0]); // if ok send result
        else
          next(new Error('Wrong id value'));
      })
      .catch((err) => next(err));
    }) // \ Promise

  }; // \GET - id

  // GET - all
  static getAll(max) {

    return new Promise((next) => {
      if (max != undefined && max > 0) { // send promise to get all members
        db.query('SELECT * FROM members LIMIT 0, ?', [parseInt(max)])
          .then((result) => next(result))
          .catch((err) => next(err));
      } else if (max !== undefined) {
          next(new Error('Wrong max value'));
      } else { // retrieve and send object
          db.query('SELECT * FROM members')
          .then((result) => next(result)) // if ok send result
          .catch((err) => next(err));
      }
    }) // \ Promise

  }; // \GET - all

  // POST
  static add(name) {

    return new Promise ((next) => {
      if (name !== undefined && name.trim() !== '') {
        name = name.trim();
        const id = uuid();
        db.query('SELECT * FROM members WHERE name = ?', [name])
          .then((result) => {
            if ( result[0] !== undefined ) { // member already exists
              next(new Error('Name already taken'));
            } else { // send promise to insert new member
              return db.query('INSERT INTO members(id, name) VALUES(?, ?)', [id, name]);
            }
          })
          .then(() => { // retrieve and send object
            return db.query('SELECT * FROM members WHERE name = ?', [name]);
          })
          .then((result) => {
            next({ // if ok send result
              id: id,
              name: result[0].name
            })
          })
          .catch((err) => next(err));
      } else {
        next(new Error('No name value'));
      }
    }) // \ Promise

  }; // \POST

  // PUT
  static update(id, name) {
    return new Promise ((next) => {
      if (name !== undefined && name.trim() !== '') {
        name = name.trim();
        db.query('SELECT * FROM members WHERE id = ?', [id])
          .then((result) => {
            if (result[0] != undefined) {
              return db.query('SELECT * FROM members WHERE name = ? AND id != ?', [name, id]);
            } else {
                next(new Error('Wrong id'));
            }
          })
          .then((result) => {
            if (result[0] != undefined) { // Same name found
              next(new Error('Name already taken'));
            } else {// Now we can modify the member
                return db.query('UPDATE members SET name = ? WHERE id = ?', [name, id]);
            }
          })
          .then(() => next(true))
          .catch((err) => next(err));
      } else { // No name inserted
          next(new Error('No name value'));
      }
    })// \ Promise
  }; // \ PUT

  // DELETE
  static delete(id) {
    return new Promise ((next) => {
      db.query('SELECT * FROM members WHERE id = ?', [id])
      .then((result) => {
        if (result[0] != undefined) {
          return db.query('DELETE FROM members WHERE id = ?', [id]);
        } else {
          next(new Error('Wrong id'));
        }
      })
      .then(() => next(true))
      .catch((err) => next(err));
    })
  }; // \ DELETE


}; // \Members