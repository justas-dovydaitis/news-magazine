require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongooseConn = require('./src/utils/mongooseConnect');

const app = express();
const router = express.Router();


const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const routes = require('./src/routes/index');

mongooseConn();

if (environment !== 'production') {
    const logger = require('morgan');
    app.use(logger('dev'));
}
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use('/api/', routes(router));


app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;