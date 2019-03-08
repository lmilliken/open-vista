const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const config = require('./config');

//const errorHandlers = require('./utils/errorHandlers');

//this just executes the file, no export needed
require('./models/ProgramType');
require('./models/User');

const mongoose = require('mongoose');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// current this hangs the server
// app.use(expressValidator);

const sharedRoutes = require('./routes/sharedRoutes');
app.use('/api', sharedRoutes);

app.get('/test', (req, res) => res.send('here'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});

module.exports = { app };
