const path = require('path');
const dotenv = require('dotenv');

const result = dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sanitizeHtml = require('sanitize-html');


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, '/dist')));

const uri = process.env.MONGO_URI;
let client;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/profile', (req, res) => {
  if (!req.session.email) {
    return res.status(200).send({ message: 'Not logged in' });
  } else {
    return res.send({ email: req.session.email, name: req.session.name });
  }
});

function sanitizeInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [],  
    allowedAttributes: {},  
  });
}

app.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  email = sanitizeInput(email);
  password = sanitizeInput(password);

  try {
    const database = client.db('login-system');
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.name = user.name;
        req.session.email = email; 
        res.send({ success: true, user }); 
      } else {
        res.status(400).send({ success: false, message: 'Incorrect email and password' }); 
      }
    } else {
      res.status(400).send({ success: false, message: 'User not found' }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error during the login process' });
  }
});

app.post('/register', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  name = sanitizeInput(name);
  email = sanitizeInput(email);
  password = sanitizeInput(password);
  confirmPassword = sanitizeInput(confirmPassword);

  if (password !== confirmPassword) {
    return res.status(400).send({ success: false, message: 'Passwords do not match.' }); 
  } 
    const database = client.db('login-system');
    const usersCollection = database.collection('users');
    const userExists = await usersCollection.findOne({ email: email });

      if (userExists) {
        return res.status(400).send({ success: false, message: 'Email already exists.'});
      }

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
          name: name, 
          email: email,
          password: hashedPassword
        };

        const result = await usersCollection.insertOne(newUser);

        console.log("User added!");

        req.session.name = name;
        req.session.email = email;

       return  res.status(201).send({ success: true, message: 'Registration successful!', user: newUser});

      } catch (error) { 
        console.error(error);
       return  res.status(500).send({ success: false, message: 'Error during the registration.'});
      }
      
});

app.post('/logout', (req, res) => {
  if (!req.session.email) {
    res.send('Already logged out');
  }
  req.session.destroy(function () {
    res.send('Logged out!');
    console.log('User logged out');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});