const express = require('express');
const app = express();
const routes = require('./routes/index');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(routes);

app.listen(8080);
console.log('Server on port 8080');
