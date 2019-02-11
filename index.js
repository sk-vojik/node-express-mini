
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// add your server code starting here.

//GET users

server.get('/users', (req, res) => {
  db.find().then(users => {
    res.status(200).json({ success: true, users })
  })
  .catch(err => {
    res.status(err.code).json({ sucess: false, message: err.message });
  })
})


//POST user

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user)
  .then(user => {
    res.status(201).json({ success: true, user })
  })
  .catch(({ code, message}) => {
    res.status(code).json({ success: false, message })
  })
});


server.listen(5000, () => {
  console.log('\n*** Running on port 5000 ***/n');
})