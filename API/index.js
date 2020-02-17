require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const multer = require('multer');

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     },
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
// let upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });
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
app.use('/', express.static(path.join(__dirname, '.', 'public')));
app.use(bodyParser.json());
app.use('/api/', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at http://localhost:${stage.port}`);
});

module.exports = app;