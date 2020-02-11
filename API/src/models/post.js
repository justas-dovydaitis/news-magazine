const mongoose = require('mongoose');
// const categorySchema = require('./category').schema;
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    images: {
        type: ['String'],
        required: false
    },
    text: {
        type: 'String',
        required: true
    },
    created: {
        type: ['Date'],
        required: true,
        immutable: true,
        default: new Date()
    },
    lastUpdated: {
        type: ['Date'],
        required: true,
        default: new Date()
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        unique: true,
        required: true
    }]
});

module.exports = {
    model: mongoose.model('Post', postSchema),
    schema: postSchema
};