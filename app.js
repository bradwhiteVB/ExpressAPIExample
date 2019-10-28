const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

const usersRouter = require('./src/routes/users');
app.use('/users', usersRouter);


module.exports = app.listen(port, () => {
  console.log(`ExpressAPIExample listening on port ${port}!`);
  console.log('Use http://127.0.0.1:3000/users [GET] -> View all users');
  console.log('Use http://127.0.0.1:3000/users/{ID} [GET] -> View specific user');
  console.log('Use http://127.0.0.1:3000/user/{ID} [DELETE]-> Delete specific user');
  console.log('Use http://127.0.0.1:3000/user [POST] -> Create new user (Send in body)');
});

