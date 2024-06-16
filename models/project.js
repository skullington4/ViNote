const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project: {type: String, required: true},
    description: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);