const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//MIDDLEWARES
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Import Routes
const bookRoute = require('./routes/book')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

//app.use('/posts', postRoute);
app.use('/api/books', bookRoute);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
    console.log('connected to DB')
);

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`));


