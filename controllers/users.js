//const { request } = require('http');

const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  if(!name || !email || !password){

    return response.status(400).json({ error: 'Todos los espacios son requeridos' });
  }

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);


  const newUser = new User({
    name,
    email,
    passwordHash,
  });

  const saveUser = await newUser.save();
  const token = jwt.sign({ id: saveUser.id }, process.env.ACCESS_TOKEN_SECRET);
  console.log(token);
});

module.exports = usersRouter;
