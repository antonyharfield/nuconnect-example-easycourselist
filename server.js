// Example from https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770

const express = require('express')
const session = require('express-session')
const mustache = require('mustache-express')

const app = express()
app.engine('html', mustache())
app.set('view engine', 'html')
app.use(express.static('static'))
app.use(session({ secret: 'andyetitcompiles', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true })) // Not suitable for production

app.get('/', require('./root'))
app.get('/profile', require('./profile'))
app.get('/home', require('./home'))
app.get('/enrolled', require('./enrolled'))

app.use('/login', require('./auth'))

app.listen(50451, () => {
  console.info('Running on port 50451')
})
