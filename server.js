const express = require('express');
const app = express();

app.use(logginMiddleWare);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/user', authorizingUsersAccess, (req, res) => {
  console.log(req.admin);
  res.send('User page');
});

// Middleware Function 
function logginMiddleWare(req, res, next) {
  console.log(`${new Date().toISOString()}`);
  next();
};

//Middleware function 
function authorizingUsersAccess(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true;
    next();
  } else {
    res.send('Error: You must be an admin');
  }
}

app.listen(3000, () => {
  console.log('Server is running ...');
});
