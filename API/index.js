require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongooseConn = require('./src/utils/mongooseConnect');
const multer = require('./multer');
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
app.use('/', express.static(path.join(__dirname, '.', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '.', 'uploads')));
app.use(bodyParser.json());
app.use(multer.upload);
app.use('/api/', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at http://localhost:${stage.port}`);
});

module.exports = app;