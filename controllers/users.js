//const { request } = require('http');

const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

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
  const token = jwt.sign({ id: saveUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' } );

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com ',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: saveUser.email, // list of receivers
    subject: 'Verificacion de usuario', // Subject line
    html: `<a href="${PAGE_URL}/${token}}">Verificar correos</a>`, // html body
  });

  return response.status(201).json('Usuario creado, Por favor verifica tu correo');

});

module.exports = usersRouter;
