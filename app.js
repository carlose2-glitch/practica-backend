const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const path = require('path');


(async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('conectado a mongo db');
  } catch (error) {
    console.log(error);
  }
})();

//rutas frontend

app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));


module.exports = app;