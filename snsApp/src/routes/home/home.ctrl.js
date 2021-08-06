"use strict";
const User = require("../../models/User");
const jwt = require("../../models/jwt");

const output = {
  home: (req, res) => {
    res.send('hello');
  },

  loginCheck: (req, res) => {
    const token = req.cookies['token'];
      if (token === undefined) {
      return res.json('You don\'t have a token');
    }
    const payload = jwt.verifyToken(token);
    res.json(payload.id);
  },
}

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    const response = await user.login();

    if (response.success) {
      const token = jwt.createToken(req.body.id);
      res.cookie('token', token, { httpOnly: true });
      response['token'] = token;
      res.status(200).json(response);
    } 
    else res.status(401).json(response);
  }, 
  
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
 
    if (response.success) {
      res.status(200).json(response);
    } 
    else res.status(400).json(response);
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true });
  },

  comment: async (req, res) => {
    const token = req.cookies['token'];
    if (token === undefined) {
      res.json('로그인 후 이용해주세요.');
    }
    const payload = jwt.verifyToken(token);
    if (payload.id === req.body.id) {
      const user = new User(req.body);
      const response = await user.comment();
      res.json(response);
    }
    else {
      res.json({ success: false });
    };
  }
};

module.exports = {
  output,
  process
};