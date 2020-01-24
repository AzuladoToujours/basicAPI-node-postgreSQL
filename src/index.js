const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const morganMode = 'dev';

//Middlewares
app.use(morgan(morganMode));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//Routes
app.use(userRoutes);
app.use(authRoutes);

app.listen(8080);
console.log('Server on port 8080');
