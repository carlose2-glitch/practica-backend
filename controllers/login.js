const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRouter.post('/', async (request, response) => {

  const { email, password } = request.body;
  console.log(email, password);
  const userExist = await User.findOne({ email });
  //console.log(userExist);

  if(!userExist){
    return response.status(400).json({ error:'email o contraseña invalido' });
  }

  if(!userExist.verified){
    return response.status(400).json({ error:'tu email no ha sido verificado' });
  }

  const isCorrect = await bcrypt.compare(password, userExist.passwordHash);
  //console.log(isCorrect);

  if(!isCorrect){
    return response.status(400).json( { error:'email o contraseña invalido' });
  }

  const userForToken = {
    id: userExist.id,

  };

  const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

  response.cookie('accessToken', accessToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });

  return response.sendStatus(200);
});


module.exports = loginRouter;