const { request } = require('http');

const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  console.log(name, email, password);
});

module.exports = usersRouter;
