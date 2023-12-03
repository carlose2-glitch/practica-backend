const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');


todosRouter.get('/', async (request, response) => {

  console.log(request.user);

  //   const todos = await Todo.find({ user: 'adasa' });
  //   return response.status(200).json(todos);

});

module.exports = todosRouter;