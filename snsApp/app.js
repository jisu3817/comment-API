const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const indexRouter = require('./src/routes/home/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
