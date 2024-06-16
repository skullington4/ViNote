const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: {type: String, required: true},
    section: {type: String, required: true},
    question: {type: String, required: true},
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {type: Date, default: Date.now}
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);