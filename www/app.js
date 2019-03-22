const express = require('express');
const parser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const { getOrSetCookie, cookieParser } = require('./middleware');
const app = express();

// fake db
const db = {};
db['kevin5@tax.com'] = {
  username: 'kevin',
  email: 'kevin5@tax.com',
  password: 'helloWorld1',
};

// fake sessionStore
const ss = {};

// expire from session store 180000
const ssExpire = (sessionId) => {
  setTimeout(() => {
    delete ss[sessionId];
  }, 180000);
};

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

// check or set cookie on all routes
app.get('*', getOrSetCookie);

app.use(express.static(path.join(__dirname, '../client/public')));

// login route
app.post('/auth', (req, res, next) => {
  const { email } = req.body;
  const user = db[email];

  if (user) {
    res.clearCookie('coffee');

    // simulate a web token
    const coffee = 'g0dDb' + Date.now() + 'c0ff33';
    const salt = bcrypt.genSaltSync();
    const hash = 'c' + bcrypt.hashSync(coffee, salt);

    res.cookie('coffee', hash, { maxAge: 180000 });

    // store token in sessionStore and kickoff timer
    ss[hash] = true;
    ssExpire(hash);

    const valid = {
      msg: 'success',
      sessionId: hash,
    };

    res.status(201).send(valid);
  } else {
    const invalid = {
      msg: 'invalid',
      sessionId: 'd3nI3b',
    };
    return res.status(401).send(invalid);
  }
});

// signup route
app.post('/signup', (req, res, next) => {
  let { username, email, password } = req.body;
  
  // if the user exists, send error
  if (db[email]) return res.status(401).send('user already exists');
  // write to fake db, hash password
  password = bcrypt.hashSync(password, bcrypt.genSaltSync());
  db[email] = { username, email, password };

  // create a session for them
  res.clearCookie('coffee');

  const coffee = 'g0dDb' + Date.now() + 'c0ff33';
  const salt = bcrypt.genSaltSync();
  const hash = 's' + bcrypt.hashSync(coffee, salt);

  res.cookie('coffee', hash, { maxAge: 180000 });

  ss[hash] = true;
  ssExpire(hash);

  return db[email] ? res.status(201).send({ sessionId: hash }): res.status(401).send('invalid') ;
});

// validate sessions route
app.post('/validate', (req, res, next) => {
  const { sessionId } = req.body;
  return ss[sessionId] ? res.status(201).send('success'): res.status(200).send('invalid');
});


// logout route
app.delete('/logout', (req, res, next) => {
  res.clearCookie('coffee');
  const { sessionId } = req.body;
  if (ss[sessionId]) {
    delete ss[sessionId];
    res.status(200).send('you are logged out');
  } else {
    res.status(401).send('session not terminated');
  }
});

// send all endpoints the html
app.get('*', (req, res) => {
  res.sendFile((path.resolve(__dirname, '../client/public/', 'index.html')))
});

module.exports = app;


