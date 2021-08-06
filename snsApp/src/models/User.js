"use strict";

const UserStorage = require("./UserStorage");
const bcrypt = require ('bcrypt');

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const user = this.body;
    try {
      const { id, password } = await UserStorage.getUserInfo(user.id) || {};

      if (id && id === user.id) {
        if (bcrypt.compareSync(user.password, password)) {
          return { success: true};
        };
        return { succcess: false, msg: "비밀번호가 틀렸습니다." };
      };
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
        return { success: false, msg: err };
    };
  };

  async register() {
    const user = this.body;
    try {
      const response = await UserStorage.saveUserInfo(user);
      return response;
    } catch (err) {
      return { success: false, msg: err.sqlMessage };
    };
  };

  async comment() {
    const user = this.body;
    try {
      const response = await UserStorage.saveComment(user);
      return response;
    } catch (err) {
      return {success: false, msg: err.sqlmessage };
    };
  };
}

module.exports = User;