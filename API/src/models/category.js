const mongoose = require('mongoose');
// const postSchema = require('./post').schema;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: 'String',
        required: true,
        // unique: true
    }
});

module.exports = {
    model: mongoose.model('Category', categorySchema),
    schema: categorySchema
};