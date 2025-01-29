const express = require('express');
const app = express();
const port = 3001;
const cors = require ('cors');
const bodyParser = require('body-parser');
const session = require('express-session');


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/profile', (req, res) => {
   res.send("User login");
});

app.post('/login', (req, res) => {

});

app.post('/register', (req, res) => {

});

app.post('/logout', (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
