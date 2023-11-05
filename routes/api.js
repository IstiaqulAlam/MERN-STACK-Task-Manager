const express = require('express');
const router = express.Router();
const cors = require('cors');
const Todo = require('../models/todo');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()

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
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const users = await collection.find({ Username: req.body.username, Password: req.body.password}).toArray();
  res.json({
      msg: users
    });
  await client.close();
});

router.post('/register', async (req, res, next) => {
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const collection = database.collection('Users');
  const basketsCollection = database.collection('Baskets');
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
    Recipes: [],
    Tasks: []
  })

  const baskId = new ObjectId();
  // Insert a new basket document in the 'Baskets' collection
  await basketsCollection.insertOne({
    _id: baskId,
    User: req.body.username, // Assuming the 'User' field is related to the username
    Ingredients: []
  });

  res.json({
      msg: "User registered"
  });
  await client.close();
});

router.put('/updateLastLoggedIn', async (req, res, next) => {
  const client = await MongoClient.connect(process.env.DB);
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
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');
  const tasksCollection = database.collection('Tasks');

  try {
    const id = new ObjectId();
    await tasksCollection.insertOne({
      _id: id,
      User: req.body.username,
      Desc: req.body.desc,
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

router.delete('/deleteTask/:username/:taskId', async (req, res, next) => {
  const username = req.params.username; // Extract the user ID from the request parameters
  const taskId = req.params.taskId; // Extract the task ID from the request parameters

  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');
  const tasksCollection = database.collection('Tasks');

  try {
    // Find the user document by their unique identifier (e.g., userId)
    const user = await usersCollection.findOne({ Username: username });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (!user.Tasks || user.Tasks.length === 0) {
      res.status(404).json({ msg: "User has no tasks" });
      return;
    }

    // Convert taskId to ObjectId for comparison
    const taskObjectId = new ObjectId(taskId);
    
    // Check if the task ID is in the user's 'Tasks' array
    const taskIndex = user.Tasks.findIndex(task => task.equals(taskObjectId));

    if (taskIndex === -1) {
      res.status(404).json({ msg: "Task not found in the user's Tasks" });
      return;
    }

    // Remove the task ID from the user's 'Tasks' array
    user.Tasks.splice(taskIndex, 1);

    // Update the user document with the modified 'Tasks' array
    await usersCollection.updateOne({ Username: username }, { $set: { Tasks: user.Tasks } });

    // Find and delete the task document from the 'Tasks' collection
    await tasksCollection.findOneAndDelete({ _id: taskObjectId });

    res.json({ msg: "Task deleted from the user's Tasks and removed from the Tasks collection" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.delete('/finishTask/:username/:taskId', async (req, res, next) => {
  const username = req.params.username; // Extract the user ID from the request parameters
  const taskId = req.params.taskId; // Extract the task ID from the request parameters

  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');
  const tasksCollection = database.collection('Tasks');
  const basketCollection = database.collection('Baskets');

  try {
    // Find the user document by their unique identifier (e.g., username)
    const user = await usersCollection.findOne({ Username: username });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (!user.Tasks || user.Tasks.length === 0) {
      res.status(404).json({ msg: "User has no tasks" });
      return;
    }

    // Convert taskId to ObjectId for comparison
    const taskObjectId = new ObjectId(taskId);

    // Check if the task ID is in the user's 'Tasks' array
    const taskIndex = user.Tasks.findIndex(task => task.equals(taskObjectId));

    if (taskIndex === -1) {
      res.status(404).json({ msg: "Task not found in the user's Tasks" });
      return;
    }

    // Find the task document to get the ingredient value
    const task = await tasksCollection.findOne({ _id: taskObjectId });

    if (!task) {
      res.status(404).json({ msg: "Task document not found" });
      return;
    }

    const ingredient = task.Ingredient; // Assuming the field is named 'Ingredient'

    // Remove the task ID from the user's 'Tasks' array
    user.Tasks.splice(taskIndex, 1);

    // Update the user document with the modified 'Tasks' array
    await usersCollection.updateOne({ Username: username }, { $set: { Tasks: user.Tasks } });

    // Find and delete the task document from the 'Tasks' collection
    await tasksCollection.findOneAndDelete({ _id: taskObjectId });

    // Append the ingredient to the user's Basket collection
    await basketCollection.updateOne({ User: username }, { $push: { Ingredients: ingredient } });

    res.json({ msg: "Task deleted from the user's Tasks, removed from the Tasks collection, and ingredient added to the Basket" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.get('/getIngredientNames', async (req, res, next) => {
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const ingredientCollection = database.collection('Ingredient');

  try {
    // Find all documents in the 'Ingredient' collection and project only the 'Name' field
    const ingredients = await ingredientCollection.find({}, { projection: { _id: 0, Name: 1 } }).toArray();

    if (ingredients.length === 0) {
      res.status(404).json({ msg: "No ingredients found" });
      return;
    }

    // Extract the 'Name' field from each ingredient and create an array of ingredient names
    const ingredientNames = ingredients.map(ingredient => ingredient.Name);

    res.json(ingredientNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.get('/getUserRecipes/:username', async (req, res, next) => {
  const username = req.params.username; // Extract the username from the request parameters

  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');

  try {
    // Find the user document by their username
    const user = await usersCollection.findOne({ Username: username });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (!user.Recipes) {
      res.status(404).json({ msg: "User has no recipes" });
      return;
    }

    // Extract the 'Recipes' array from the user document
    const userRecipes = user.Recipes;

    res.json(userRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    await client.close();
  }
});

router.get('/getUserTasks/:username', async (req, res, next) => {
  const username = req.params.username; // Extract the user ID from the request parameters
  const client = await MongoClient.connect(process.env.DB);
  const database = client.db('COP4331');
  const usersCollection = database.collection('Users');
  const tasksCollection = database.collection('Tasks');

  try {
    // Find the user document by their unique identifier (e.g., userId)
    const user = await usersCollection.findOne({ Username: username });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    if (!user.Tasks || user.Tasks.length === 0) {
      res.status(404).json({ msg: "User has no tasks" });
      return;
    }

    // Initialize an array to store task information
    const userTasksInfo = [];

    // Iterate through the 'Tasks' array starting from the second index (index 1)
    for (let i = 1; i < user.Tasks.length; i++) {
      const taskId = user.Tasks[i]; // Get the task ID from the user's 'Tasks' array

      // Find the task document by its ID
      const task = await tasksCollection.findOne({ _id: taskId });

      if (task) {
        userTasksInfo.push(task);
      }
    }

    res.json(userTasksInfo);
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
