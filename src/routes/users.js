const express = require("express");
const router = express.Router();

const { isValidDate } = require("../utils/isValidDate");
const { check, validationResult } = require('express-validator');
const User = require("../models/users");


//Get all users
router.get('/', async (req, res) => {
  try{
    const users = await User.find();
    res.json(users);
  } catch (err){
    res.status(500).json({message: err.message})
  }
});

//Get one user
router.get('/:id', async (req, res) => {
  try{
    const users = await User.find(req.params.id);
    res.json(users);
  } catch (err){
    res.status(404).json({message: err.message})
  }
});

//Create users
router.post('/', [
  check('name').exists().isLength({ min: 3 }),
  check('email').exists().isEmail(),
  check('dob').custom(isValidDate).withMessage('The date must be in YYYY-MM-DD format')
], async (req, res) => {
  try {
    //Validate data in body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    //Try to save the data
    const newUser = await User.save({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob
    });
    res.status(201).json(newUser);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Delete user
router.delete('/:id', async (req, res) => {
  try{
    const deletedUser = await User.delete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err){
    res.status(404).json({message: err.message})
  }
});

// Middleware function to get user by ID so we know user exists prior to performing endpoint
// not needed here since my model takes care of detecting existance
// Left in since this may be necessary for complex db ops
// async function getUser(req, res, next){
//   let user;
//   try{
//     user = await User.find(req.params.id);
//     if(user == null){
//       return res.status('404').json('Cannot find user');
//     }
//   } catch (error){
//     return res.status('500').json({ message: error.message });
//   }
  
//   res.user = user;
//   next();
// }

module.exports = router;