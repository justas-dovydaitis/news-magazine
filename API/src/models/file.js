const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    path: {
        type: 'String',
        required: true,
    }
});

module.exports = {
    model: mongoose.model('File', fileSchema),
    schema: fileSchema
};