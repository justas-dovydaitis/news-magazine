const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placesSchema = new Schema({
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
        default: new Date()
    },
    lastUpdated: {
        type: ['Date'],
        required: true,
        default: new Date()
    },
});

module.exports = mongoose.model('place', placesSchema);