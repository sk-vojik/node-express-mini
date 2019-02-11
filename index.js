
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// add your server code starting here.

//GET users

server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.status(200).json({ success: true, users })
  })
  .catch(err => {
    res.status(500).json({ error: "The users information could not be retrieved"});
  })
})

server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user })
      } else {
        res.status(404).json({ success: false, error: "The user with the specified ID does not exist"});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved"})
    })
})


//POST user

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };

  if (!name || !bio) {
    return res.status(400).json({ error: "Please provide name and bio for the user." })
  }
  db.insert(newUser)
  .then(userId => {
    const { id } = userId;
    db.findById(id).then(user => {
      if(!user) {
        return res.status(422).json({ error: `user does not exist by id ${id}`})
      }
      res.status(201).json(user);
    })
  })
  .catch(({ code, message}) => {
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })
});



//DELETE user

server.delete('/api/users/:id', (req, res) => {
  userId = req.params.id;
  db.remove(userId)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).json({ message: "User was successfully removed" });
      } else {
        res.status(404).json({ error: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" })
    })

  
});




//SERVER RUN

server.listen(5000, () => {
  console.log('\n*** Running on port 5000 ***/n');
})

