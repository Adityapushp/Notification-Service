const express = require('express');
const app = express();
const notificationRoutes = require('./routes/notificationRoutes'); // correct folder

app.use(express.json());
app.use('/', notificationRoutes); // mounted properly

module.exports = app;