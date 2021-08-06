"use strict";

const db = require("../config/db");
const bcrypt = require ('bcrypt');

class userStorage {
  static getUserInfo(id) {
    return new Promise ((resolve, reject) => {
      const query = "SELECT * FROM Users WHERE id=?";
      db.query(query, [id], (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data[0]);
      });
    });
  };

  static saveUserInfo(user) {
    return new Promise ((resolve, reject) => {
      const saltRounds = 10;
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        user.password = hash;
        const query = "INSERT INTO users(id, name, password) VALUES(?, ?, ? )";
        db.query(query, [user.id, user.name, user.password], (err) => {
          if (err) reject(err);
          resolve({ success: true, msg: " Sign Up Success!" });
        });
      });
    });
  };

  static saveComment(user) {
    return new Promise ((resolve, reject) => {
      const query = "INSERT INTO comments(commenter, comment) VALUES((SELECT id FROM users WHERE id=?), ?)";
      db.query(query, [user.id, user.comment], (err) => {
        if (err) reject(err);
        resolve({ success: true, msg: user.comment});
      });
    });
  };
};

module.exports = userStorage;