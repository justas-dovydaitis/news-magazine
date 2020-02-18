const mongoose = require('mongoose');
// const categorySchema = require('./category').schema;
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    imageUrl: {
        type: 'String',
        required: false
    },
    imageAlt: {
        type: 'String',
        required: false
    },
    imageTitle: {
        type: 'String',
        required: false
    },
    content: {
        type: 'String',
        required: true
    },
    created: {
        type: 'Date',
        required: true,
        immutable: true,
        default: new Date()
    },
    lastUpdated: {
        type: 'Date',
        required: true,
        default: new Date()
    },
    featured: {
        type: 'Boolean',
        required: true,
        default: false
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    }]
});

module.exports = {
    model: mongoose.model('Post', postSchema),
    schema: postSchema
};