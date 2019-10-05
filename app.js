const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { check, validationResult } = require('express-validator');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');


/* ***
 * Dummy DB - Since a selection of a database is arbitrary for this exercise, a simple object that keeps state while the express server is running should suffice
 * ***/
var users = {
  0: { name: 'Test John', email:'tj@test.com',dob:'20190312' }
};
var usercount = 1;


/* ***
* Route: {get} /users/{id - optional}
* Desc: Get users or if an ID is passed, only that user
*
* Param-Path:  {string} UserID
*
* Success: (200) JSON payload with result
* ***/
app.get('/users/:id?', (req, res) => {

  //Since the userID is optional - we can deliver results on one requested item or return all
  let userID = req.params.id || '';

  //If we received a user ID then get and return that record, if not return all
  if(userID !== ''){
    //Simple return item for this exercise
    var filtered = {};
    if(users.hasOwnProperty(userID)){
      filtered[userID] = users[userID];
    }
  }else{
    var filtered = users;
  }

  //Send back result
  res.json(filtered);
});

/* ***
* Route: {post} /users
* Desc: Post user after validation (simple)
*
* Param-Body:  {Object} {name: "", email:"", dob:""}
*
* Success: (200) JSON payload with inserted element
* ***/
app.post('/users', [
  check('name').exists().isLength({ min: 3 }),
  check('email').exists().isEmail(),
  check('dob').exists()
], (req, res) => {
 
  try{
    //Validate data in body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    //Get the data
    console.log(req.body);
    const name  = req.body.name;
    const email = req.body.email;
    const dob   = req.body.dob;
  
    //Determine if this is a duplicate - email address check
    const userIDs = Object.keys(users);
    var duplicate = false;
    for(idx in userIDs){
      if(!duplicate && users[userIDs[idx]].email === email){
        duplicate = true;
      }
    }
    if(duplicate){
      return res.status(422).json({ errors: "An existing user has that email address" })
    }

    //Add new user
    let user = {name:name, email: email, dob: dob}
    users[usercount] = user;
    var tmpRet = {};
    tmpRet[usercount] = user; //Doing this to keep the format returned standard
    usercount += 1;
    res.json(tmpRet);
  } catch(error) {
    return res.status(500).json({ errors: {code: error.code, msg: error.message} })
  }
});

/* ***
* Route: {delete} /users/id (mandatory path param)
* Desc: Delete user via user id
*
* Param-Path: {string} UserID
*
* Success: (204) Empty JSON content
* ***/
app.delete('/users/:id', (req, res) => {
  let userID = req.params.id;
  if(users.hasOwnProperty(userID)){
    delete users[userID];
    res.status('204').json('');
  }else{
    res.status('400').json({errors: "No such user"});
  }
});

module.exports = app.listen(port, () => {
  console.log(`ExpressAPIExample listening on port ${port}!`);
  console.log('Use http://127.0.0.1:3000/users [GET] -> View all users');
  console.log('Use http://127.0.0.1:3000/users/{ID} [GET] -> View specific user');
  console.log('Use http://127.0.0.1:3000/user/{ID} [DELETE]-> Delete specific user');
  console.log('Use http://127.0.0.1:3000/user [POST] -> Create new user (Send in body)');
});