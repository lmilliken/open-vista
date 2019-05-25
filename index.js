const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const cors = require('cors');
const config = require('./config');

//const errorHandlers = require('./utils/errorHandlers');

//this just executes the file, no export needed
require('./models/ProgramType');
require('./models/Program');
require('./models/User');
require('./utils/passportSetup');
const mongoose = require('mongoose');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//remember, this is middleware
app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [config.cookieKey] })
); //attaches information to req.session

app.use(passport.initialize()); //pulls info from req.session
app.use(passport.session());

// current this hangs the server
// app.use(expressValidator);

const sharedRoutes = require('./routes/sharedRoutes');
app.use('/api', sharedRoutes);

const programRoutes = require('./routes/programRoutes');
app.use('/api', programRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.get('/api/test', (req, res) => res.send('this test works!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});

module.exports = { app };
