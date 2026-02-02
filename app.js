const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/users', require('./routes/user.route'));

app.use('/auth', require('./routes/auth.route'));

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});

