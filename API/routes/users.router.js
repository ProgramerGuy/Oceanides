var express = require('express');
var router = express.Router();
const User = require('../model/users.model');
const createError = require('http-errors');
const {jsonResponse} = require('../lib/jsonresponse');

const authMiddleware = require('../auth/auth.middleware'); 

/* GET users listing. */
router.get('/',authMiddleware.checkAuth, async function(req, res, next) {
  
  let results;

  try{
    results = await User.find({}, '_id username name');
  }catch(ex){
    next(createError(400, 'There was a problem with the request'))
  }

  res.json(jsonResponse(200, results));
});

/* This is a post request to the users route. It is checking if the username and password are present
in the request body. If they are not present, it is calling the next function. If they are present,
it is creating a new user with the username and password. It is then checking if the username
exists. If it does, it is returning a message saying that the user exists. If it does not, it is
saving the user and returning a message saying that the user was added correctly. */
router.post('/', authMiddleware.checkAuth, async function(req, res, next) {
  const {username, password} = req.body;

  if(!username || !password){
    next();
  }else{
    const user = new User({username, password});

    const exists = await user.usernameExists(username);

    if(exists){
      res.json({
        message: 'user exists'
      });
    }else{
      await user.save();

      console.log('User added');
      res.json(jsonResponse(200, {message: 'User added correctly'}));
    }
    
  }
});

/* This is a get request to the users route with an iduser parameter. It is checking if the iduser is
present in the request body. If it is not present, it is calling the next function. If it is
present, it is finding the user with the iduser. It is then checking if the user exists. If it does,
it is returning the user. If it does not, it is returning a message saying that the user does not
exist. */
router.get('/:iduser', authMiddleware.checkAuth, async function(req, res, next) {
  let results;

  try{
    results = await User.findById(req.params.iduser, '_id username name');
    
    if(!results) return next(new createError(400, `No user found`));
  }catch(ex){
    //next(new Error(`No user found with id ${req.params.iduser}`));
    next(createError(400, `No user found with id ${req.params.iduser}`))
  }

  res.json(jsonResponse(200, results));
});

/* This is a patch request to the users route with an iduser parameter. It is checking if the name and
password are present in the request body. If they are not present, it is calling the next function.
If they are present, it is finding the user with the iduser and updating the name and password. It
is then checking if the user exists. If it does, it is returning a message saying that the user was
updated correctly. If it does not, it is returning a message saying that the user does not exist. */
router.patch('/:iduser', authMiddleware.checkAuth, async function(req, res, next) {
  const {name, password} = req.body;
  let query = {};

  if(!name && !password) return next(createError(400, 'No parameters provided'));

  try{
    if(name){
      query['name'] = name;
    }
    if(password){
      query['password'] = password;
    }
    const results = await User.findOneAndUpdate({_id: req.params.iduser}, query);
    
    if(!results) return next(new createError(400, `No user found`));

  }catch(ex){
    console.log(ex);
    next(createError(400, `Some of the fields couldn't be updated`))
  }

  res.json(jsonResponse(200, {
    message: `User ${req.params.iduser} updated successfully`
  }));
  
});


module.exports = router;