// .env
// require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const options = (true === false) ? { useMongoClient: true } : {};

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);
// mongoose.connect(process.env.MONGOOSE_DB, { useMongoClient: true });
// .then(() => console.log('Mongoose running!'))
// .catch(err => console.log('mongoose Error:', err));

module.exports = mongoose;
