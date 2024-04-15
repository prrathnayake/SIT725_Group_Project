const express = require('express');
const login = require('./routes/loginRoute.js');
const index = require('./routes/indexRoute.js');

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login', login)
app.use('/', index)
 
app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`)
})