const express = require('express');
const router = express.Router();
const cors = require('cors');
const Todo = require('../models/todo');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

router.get('/get', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/make', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/delete/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/login', async (req, res, next) => {
  const client = await MongoClient.connect("mongodb+srv://APAccsess:mNGPig7mXsjIA7aT@cluster0.edvguvx.mongodb.net/");
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const users = await collection.find({ Username: req.body.username, Password: req.body.password}).toArray();
  res.json({
      msg: users
    });
  await client.close();
});

router.post('/register', async (req, res, next) => {
  const client = await MongoClient.connect("mongodb+srv://APAccsess:mNGPig7mXsjIA7aT@cluster0.edvguvx.mongodb.net/");
  const database = client.db('COP4331');
  const collection = database.collection('Users');
    // Check if the username or email already exists
  const existingUserByUsername = await collection.findOne({ Username: req.body.username });
  const existingUserByEmail = await collection.findOne({ Email: req.body.email });

  if (existingUserByUsername) {
    res.json({
      err: "Username is already taken. Please choose a different username."
    });
    await client.close();
    return;
  }

  if (existingUserByEmail) {
    res.json({
      err: "Email is already registered. Please use a different email address."
    });
    await client.close();
    return;
  }
  
  const id = new ObjectId();
  const date = new Date();
  await collection.insertOne({
    _id: id,
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Username: req.body.username,
    Password: req.body.password,
    DateCreated: date,
    DateLastLoggedIn: "",
    Email: req.body.email,
    Ingredients: [],
    Badges: []
  })
  res.json({
      msg: "User registered"
  });
  await client.close();
});

router.put('/updateLastLoggedIn', async (req, res, next) => {
  const client = await MongoClient.connect("mongodb+srv://APAccsess:mNGPig7mXsjIA7aT@cluster0.edvguvx.mongodb.net/");
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const { username } = req.body;
  const currentDate = new Date();
  try {
    await collection.updateOne(
      { Username: username },
      { $set: { DateLastLoggedIn: currentDate } }
    );
    res.json({ msg: "DateLastLoggedIn updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Error updating DateLastLoggedIn" });
  }
  await client.close();
});

//endpoint for creating a task
router.post('/createTask', async (req, res, next) => {
  const client = await MongoClient.connect("mongodb+srv://APAccsess:mNGPig7mXsjIA7aT@cluster0.edvguvx.mongodb.net/");
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');
  const tasksCollection = database.collection('Tasks');

  try {
    const id = new ObjectId();
    await tasksCollection.insertOne({
      _id: id,
      Name: req.body.firstname,
      Ingredient: req.body.ingredient
    });

    // Take in the user ID from the request (assuming you have it in req.body.userId)
    const username = req.body.username;

    // Find the user document by their unique identifier (e.g., username)
    const user = await usersCollection.findOne({ Username: username });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (!user.Tasks) {
      // If 'Tasks' array doesn't exist, create it and initialize it with an array containing the new task ID
      user.Tasks = [id];
    } else {
      // If 'Tasks' array already exists, append the new task ID
      user.Tasks.push(id);
    }

    // Update the user document with the new 'Tasks' array
    await usersCollection.updateOne({ Username: username }, { $set: { Tasks: user.Tasks } });

    res.json({
      msg: "Task created and added to the user's Tasks"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    await client.close();
  }
});

// Add CORS middleware to allow requests from any origin (you can configure this to be more restrictive)
router.use(cors());

module.exports = router;
