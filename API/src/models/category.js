const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: 'String',
        required: true,
    }
});

module.exports = {
    model: mongoose.model('Category', categorySchema),
    schema: categorySchema
};