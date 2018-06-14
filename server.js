// Example from https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770

const express = require('express');
const path = require('path');
const mustache = require('mustache-express');

const app = express();
app.engine('html', mustache());
app.set('view engine', 'html'); 

app.get('/profile', require('./profile'));
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
  });
  
app.use('/login', require('./auth'));


app.listen(50451, () => {
  console.info('Running on port 50451');
});