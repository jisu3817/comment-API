"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/logout', ctrl.process.logout);
router.get('/loginCheck', ctrl.output.loginCheck);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/comment', ctrl.process.comment);

module.exports = router;
