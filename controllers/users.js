//const { request } = require('http');

const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  if(!name || !email || !password){

    return response.status(400).json({ error: 'Todos los espacios son requeridos' });
  }
});

module.exports = usersRouter;
