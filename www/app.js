const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();

// fake db
const db = {};
db['kevin5@tax.com'] = {
  username: 'kevin',
  email: 'kevin5@tax.com',
  password: '123456',
};

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, '../client/public')));


// integrate bcrypt here
app.post('/auth', (req, res, next) => {
  const { username, email, password } = req.body;
  const user = db[email];
  return user ? res.status(201).send('success'): res.status(401).send('invalid') ;
});

// integrate bcrypt here
app.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
  if (db[email]) return res.status(200).send('user already exists');
  db[email] = { username, email, password };
  return db[email] ? res.status(201).send('success'): res.status(401).send('invalid') ;
});

app.get('*', (req, res) => {
  res.sendFile((path.resolve(__dirname, '../client/public/', 'index.html')))
});

module.exports = app;
